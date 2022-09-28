import axios from "axios"

import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0"

export default async function handler(req: any, res: any){
    try {
        const { accessToken } = await getAccessToken(req, res)

        let config = {
            headers: { 'Authorization': 'Bearer ' + accessToken }
        }

        await axios.get(`${process.env.SERVICES_API_URL}/api/services/2`, config)
        .then((response) => {
            res.json(response.data)
        })
        .catch((err) => {
            res.send('ALL BAD: ' + err)
        })
    } catch (error) {
        res.send(error)
    }
}
