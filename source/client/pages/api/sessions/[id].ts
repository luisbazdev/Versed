import type { NextApiRequest, NextApiResponse } from 'next'

import axios from "axios"
import { getAccessToken } from "@auth0/nextjs-auth0"

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    let { accessToken } = await getAccessToken(req, res)
    let config = { headers: { 'Authorization': 'Bearer ' + accessToken } }

	let { id } = req.query

    switch(req.method){
        case "GET": {
            try {
		    	axios.get(`${process.env.VERSED_SESSIONS_API_URL}/${id}`, config)
                // you updated the status here
		    	.then((_res) => res.status(200).json({response: _res.data}))
		    } catch (error) {
		    	res.json({error})
		    }

            break;
        }
        
		default: res.status(405).send("Method not allowed")

    }
}
