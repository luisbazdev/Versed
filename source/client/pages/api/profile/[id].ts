import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios"

import { getSession } from "@auth0/nextjs-auth0"

export default async function handler(req: NextApiRequest, res: NextApiResponse){
	let { id } = req.query

	let session = getSession(req,res)
    let accessToken = session?.accessToken

	let config = { headers: { 'Authorization': 'Bearer ' + accessToken } }

	switch(req.method){
		case "GET": {
			try{
				axios.get(`http://localhost:8080/api/users/profile/${id}`, config)
				.then((response) => res.json({response: response.data}))
			} catch(error: any){
				res.status(error.response.status).send(error.response.data)
			}

			break
		}
		
		default: res.status(405).send("Method not allowed")
	}

}