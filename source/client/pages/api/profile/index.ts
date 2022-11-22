import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios"

import { getSession } from "@auth0/nextjs-auth0"

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    let session = getSession(req,res)

    let accessToken = session?.accessToken

    let body = {
        name: req.body.name,
        description: req.body.description,
        location: req.body.location,
        picture: session?.user.picture
    }

    let config = { headers: { 'Authorization': 'Bearer ' + accessToken } }

    switch(req.method){
        case "GET": {
            try {
                axios.get(`${process.env.VERSED_USERS_API_URL}/profile/me`, config)  
                .then((response) => res.status(200).json({data: response.data}))
            } catch (error: any) {
                res.status(error.response.status).send(error.response.data)
            }
            break
        }

        case "POST": {
            try {
                axios.post(`${process.env.VERSED_USERS_API_URL}/profile`, body, config)
                .then((response) => res.status(200).json({data: response.data}))
            } catch(error: any) {
				res.status(error.response.status).send(error.response.data)
            }

            break
        }

        default: res.status(500).send("Method not allowed")
    }
}
