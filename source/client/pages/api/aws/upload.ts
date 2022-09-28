import s3 from "../../../aws/index"
import { v4 as uuidv4 } from "uuid"

export default async function handler(req: any, res: any){
	switch(req.method){
		case "POST": {
			try{
				const { type } = req.body

				const fileParams = {
					Bucket: process.env.AWS_BUCKET_NAME,
					Key: uuidv4(),
					Expires: 600,
					ContentType: type,
					ACL: "public-read"
				}

				const url = await s3.getSignedUrlPromise("putObject", fileParams)

				res.status(200).json({url})
			} catch(error){
				res.json({error})
			}

			break
		}

		default: {
			res.json({message: "Method not allowed"})
		}
	}
}
