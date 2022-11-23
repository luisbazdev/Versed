import Image from 'next/image'
import React, {useEffect, useState} from 'react'
import axios from "axios"
import Rating from '@mui/material/Rating'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import IconButton from '@mui/material/IconButton'
import { Container, Box } from '@mui/material'
import Payment from "./Payment"

export default function Service({service}){
	const [ loading, setLoading ] = useState(true)
  	const [ mentorMethods, setMentorMethods ] = useState([])
  	const [ mentorProfile, setMentorProfile ] = useState(null)
	
	useEffect(() => {
		axios.get(`/api/user/${service.mentorId}`)
        	.then((response) => {
        		setMentorMethods(response.data.data.user.payment_methods)
        		setMentorProfile(response.data.data.user.profile)
						setLoading(false)
        	})
	}, [])

	if(loading) return <p>Loading ok</p>
	return (
		<Box className="grid grid-cols-[1fr_450px] mt-[62px] overflow-y-auto">
			<Box className="px-4 py-3 overflow-y-auto">
				<Box className="flex">
					<IconButton className="flex gap-1">
						<KeyboardBackspaceIcon/>
					</IconButton>
				</Box>
				<Box className="text-xl font-semibold">
					<h2>About this service</h2>
				</Box>
				<Box className="flex items-center">
					<p className="text-md text-gray-600">{service.signature} > <span className="font-semibold text-black text-lg">{service.title}</span></p>
					<Rating className="ml-2" name="half-rating-read" value={service.rating} precision={1} readOnly/>
					{/* date and time here */}
				</Box>

	 		<Box className="my-2 pb-4 border-b border-gray-400">
	 			<span className="text-gray-600">{service.description}</span>
	 		</Box>


	 			<Box className="grid col-span-2 mt-8 gap-4">
	 				<Box className="flex flex-col p-4 border border-gray-400 h-[auto]">
	 					<Box className="flex items-center gap-2">
	 						<span className="font-semibold text-black text-lg">{service.title}</span>
	 						<Rating name="half-rating-read" value={service.rating} precision={1} readOnly/>	
						</Box>

	 					<Box className="text-md">
	 						<span className="font-semibold">Mentor: </span>
							{mentorProfile.name}
	 					</Box>
						
	 					<Box className="text-md">
	 						<span className="font-semibold">Signature: </span>
	 						<span>{service.signature}</span>	
	 					</Box>

 					<Box className="text-md mb-6">
 						<span className="font-semibold">Price: </span>
 						<span>USD {service.price}</span>	
 					</Box>

 					<Payment service={service} methods={mentorMethods}/>	
 				</Box>
 			</Box>

 		</Box>

 		<Box className="border-l border-gray-200 p-4 overflow-y-auto">
 			<Box>
 				<Box className="flex flex-col items-center gap-2">
 					<Box className="mb-4 flex flex-col w-[90px] h-[90px] rounded-full">
 						<Image 
                    		className='rounded-full'
                    		width={90}
                    		height={90}
                    		src={mentorProfile.picture}
                    		/>
 					</Box>
            		</Box>
 			</Box>
 			<Box className="flex flex-col gap-2 overflow-y-auto">
 				<Box className="flex flex-col">
					<h2 className="text-lg font-semibold">About {mentorProfile.name}</h2>
					<span className="text-gray-600">{mentorProfile.description}</span>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

