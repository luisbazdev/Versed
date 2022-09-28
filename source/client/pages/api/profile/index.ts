import axios from "axios"

import { getSession } from "@auth0/nextjs-auth0"
import { ManagementClient } from 'auth0'
import { currentUserManagementClient } from "../../../utils/auth0"

export default async function handler(req: any, res: any){

    const session = await getSession(req,res)

    const id = session?.user.sub

    switch(req.method){

        case "GET": {
            try {
                const currentUser = await currentUserManagementClient(req, res)

                const user = await currentUser.getUser({id})
        
                res.json(user)
            } catch(error) {
                res.json({error: error})
            }

            break
        }

        case "PUT": {
            try {
                const currentUser = await currentUserManagementClient(req, res)

                const params = req.body

                await currentUser.updateUserMetadata({id}, params)
            } catch(error){
                res.json({error: error})
            }

            break
        }

        case "PATCH": {
            try {
                // get the file from request body
                const { file } = req.body

                // call /api/aws/upload and get signed url
                const { data } = await axios.post("/api/aws/upload", {
                    type: file.type
                })

                const url = data.url

                // hit the signed url
                const { data: newData } = await axios.put(url, file, {
                    headers: {
                        "Content-Type": file.type,
                        "Access-Control-Allow-Origin": "*"
                    }
                })

                const currentUser = await currentUserManagementClient(req, res)

                await currentUser.updateUserMetadata({id}, { pictureUrl: newData.url})

                res.json({pictureUrl: newData})


            } catch(error){
                res.json({error})
            }
        }

        default: {
            res.json({message: "Method not allowed"})
            break
        }
    }
}