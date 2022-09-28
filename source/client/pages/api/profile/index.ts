import axios from "axios"

import { getAccessToken, getSession } from "@auth0/nextjs-auth0"
import { ManagementClient } from 'auth0'

export default async function handler(req: any, res: any){
    // Implement AWS S3 here
	try {
        const session = await getSession(req,res)
        const { accessToken } = await getAccessToken(req, res)

        const currentUserManagementClient = new ManagementClient({
            token: accessToken,
            domain: process.env.AUTH0_ISSUER_BASE_URL.replace('https://', ''),
            scope: process.env.AUTH0_SCOPE,
        })

        let id = session.user.sub

        const user = await currentUserManagementClient.getUser({id})
        
        res.json(user)
    } catch (error) {
        res.json({error: error})
    }
}