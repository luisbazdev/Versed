import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios"

import { getAccessToken } from "@auth0/nextjs-auth0"

export default async function handler(req: NextApiRequest, res: NextApiResponse){
	let { accessToken } = await getAccessToken(req, res)
    let config = { headers: { 'Authorization': 'Bearer ' + accessToken } }

	switch(req.method){
		case "GET": {
			try {
				axios.get(`${process.env.VERSED_MENTORSHIPS_API_URL}/me`, config)
				.then((_res) => res.status(200).json({mentorships: _res.data.mentorships}))			
			} catch (error: any) {
				res.status(error.response.status).send(error.response.data)
			}

			break
		}

		case "POST": {
			let body = req.body
			
			try {
				axios.post(`${process.env.VERSED_MENTORSHIPS_API_URL}`, body, config)
				.then((response) => res.status(200).json({response: response.data}))
			} catch (error: any) {
				res.status(error.response.status).send(error.response.data)
			}

			break
		}

		default: res.status(405).send("Method not allowed")
	}
}
