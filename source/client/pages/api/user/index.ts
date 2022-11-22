import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios"

import { getSession } from "@auth0/nextjs-auth0"

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    let session = getSession(req,res)

    let id = session?.user.sub.replace("auth0|", "")
	let { occupation } = req.body

	switch(req.method){
		case "GET": {
			try {
				await axios.get(`${process.env.VERSED_USERS_API_URL}/${id}`)
				.then((response) => res.status(200).json({data: response.data}))
			} catch(error: any){
				res.status(error.response.status).send(error.response.data)
			}

			break
		}

		case "POST": {
			try {
				await axios.post(`${process.env.VERSED_USERS_API_URL}`, { id, occupation })
				.then((response) => res.status(200).json({data: response.data}))
			} catch(error: any) {
				res.status(error.response.status).send(error.response.data)
			}
		}

		default: res.status(405).send("Method not allowed")
	}
}
