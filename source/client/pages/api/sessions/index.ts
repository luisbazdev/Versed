import type { NextApiRequest, NextApiResponse } from 'next'

import axios from "axios"
import { getAccessToken } from "@auth0/nextjs-auth0"

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    let { accessToken } = await getAccessToken(req, res)
    let config = { headers: { 'Authorization': 'Bearer ' + accessToken } }

	switch(req.method){
		case "GET": {
		    try {
		    	axios.get(`${process.env.VERSED_SESSIONS_API_URL}`, config)
		    	.then((_res) => res.json({response: _res.data.sessions}))
		    } catch (error) {
		    	res.json({error})
		    }
            
        break
	}

    case "POST": {
        const { studentId, mentorshipId } = req.body

            try {
                axios.post(`${process.env.VERSED_SESSIONS_API_URL}`, {
                    studentId,
                    mentorshipId,
                    createdAt: new Date(),
                    finishedAt: new Date()
                }, config)
                .then((response) => res.json({response: response.data}))
            } catch (error) {
                res.json({error})
            }

            break
        }

		default: {
            res.json({message: "Method not allowed"})
		}
	}
}
