import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios"

export default async function handler(req: NextApiRequest, res: NextApiResponse){
	let { id } = req.query

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

		default: res.status(405).send("Method not allowed")
	}
}
