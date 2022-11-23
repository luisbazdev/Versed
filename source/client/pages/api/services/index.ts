import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios"

import { getAccessToken } from "@auth0/nextjs-auth0"

interface IService{
	price: String,
	signature: String,
	description: String,
	title: String,
	mentoringWeeks: String
}

export default async function handler(req: NextApiRequest, res: NextApiResponse){
	let body: IService = req.body

		let { accessToken } = await getAccessToken(req, res)
    let config = { headers: { 'Authorization': 'Bearer ' + accessToken } }

	switch(req.method){
		case "GET": {
			try {
				axios.get(`${process.env.VERSED_SERVICES_API_URL}`, config)
				.then((_res) => res.status(200).json({response: _res.data}))
			} catch(error: any) {
				res.status(error.response.status).send(error.response.data)
			}

			break
		}

		case "POST": {
			try {
				axios.post(`${process.env.VERSED_SERVICES_API_URL}`, body, config)
				.then((response) => res.json({response: response.data}))
			} catch (error: any) {
				res.status(error.response.status).send(error.response.data)
			}

			break
		}

		default: res.status(405).send("Method not allowed")
	}
}
