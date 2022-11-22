import type { NextApiRequest, NextApiResponse } from 'next'
import axios, { AxiosRequestConfig, AxiosResponse } from "axios"

import { getSession } from "@auth0/nextjs-auth0"

export default async function handler(req: NextApiRequest, res: NextApiResponse){
	if(req.method == "GET"){
		let session = getSession(req,res)
		// This won't work in development because of the localhost domain
        //let userId = session?.user.sub.replace("auth0|", "")
        let userId = "632f8e9bf67e8d09609bf857"		
	    let { code } = req.query

		// Base64 encoded credentials
		let base64 = new Buffer(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString('base64')
		
    	let params = `grant_type=authorization_code&code=${code}`
		let tokenConfig: AxiosRequestConfig = { headers: { 'Authorization': 'Basic ' + base64 } }

		try{
			/**
			 * Get an OAuth token and then use it to hit the "userinfo" 
			 * endpoint and exchange it for PayPal account details
			 */
			axios.post("https://api-m.sandbox.paypal.com/v1/oauth2/token", params, tokenConfig)
			.then((tokenResponse: AxiosResponse) => {
				// Request configuration containing the OAuth token
				let userConfig: AxiosRequestConfig = {
					headers: { 
						'Authorization': 'Bearer ' + tokenResponse.data.access_token,
						'Content-Type': 'application/json'
					},
					params: {
						schema: 'paypalv1.1'
					}
				}
				// Retrieve PayPal account info
				axios.get('https://api-m.sandbox.paypal.com/v1/identity/oauth2/userinfo', userConfig)
				.then((infoResponse: AxiosResponse) => {
					let { name, payer_id } = infoResponse.data
	
					// Call the users service and persist PayPal account details
					axios.post(`${process.env.VERSED_USERS_API_URL}/${userId}/methods`, 
					{ gateway: "PayPal", accountId: payer_id, fullName: name })
					.then((userResponse) => res.status(200).json({response: userResponse.data}))
				})	
			})
		} catch(error: any){
			res.status(500).send("An error occurred")
			// ...
		}
	}
}


