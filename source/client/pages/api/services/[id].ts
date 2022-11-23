import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios"

import { getAccessToken } from "@auth0/nextjs-auth0"

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    let { id } = req.query

    let { accessToken } = await getAccessToken(req, res)
    let config = { headers: { 'Authorization': 'Bearer ' + accessToken } }

    switch(req.method){
        case "GET": {
            try {
                await axios.get(`${process.env.VERSED_SERVICES_API_URL}/${id}`, config)
                .then((_res) => res.status(200).json({service: _res.data.service}))
            } catch(error: any) {
				res.status(error.response.status).send(error.response.data)
            }
            break
        }

		default: res.status(405).send("Method not allowed")
    }
}
