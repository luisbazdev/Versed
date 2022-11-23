import axios from "axios"
import Image from 'next/image'

import { useRouter } from "next/router";

import { useEffect, useState } from "react"
import { Card, CardActionArea, CardContent, Box, Rating } from "@mui/material"

export default function ServiceCard({service}){
	const [loading, setLoading] = useState(true)
	const [mentorProfile, setMentorProfile] = useState(null)

    const router = useRouter()

    useEffect(() => {
		axios.get(`/api/user/${service.mentorId}`)
        	.then((response) => {
        		setMentorProfile(response.data.data.user.profile)
				setLoading(false)
        	})
	}, [])

    function goToService(){
    	router.push(`/service/${service.id}`)
    }

	if(loading) return <h1>Loading</h1>
	return (
		<Card sx={{padding: 0}}
		variant="outlined" 
		className="w-[300px] h-[300px]" 
		onClick={goToService}>
			<CardActionArea>
				<CardContent className="w-[300px] h-[300px] p-0 grid grid-rows-[auto_1fr]">
					<Box className="flex items-center w-full flex flex-col py-4 px-6 bg-gray-100">
						<Box className="w-[80px] h-[80px]">
							<Image 
            				className='rounded-full'
            				width={80}
            				height={80}
            				src={mentorProfile.picture}/>
						</Box>
            			<span className="font-semibold">{mentorProfile.name}</span>
					</Box>
					<Box className="flex flex-col w-full h-full border-t border-gray-200 py-4 px-6">
						<Rating name="half-rating-read" value={service.rating} precision={1} readOnly/>
						<span className="font-semibold">{service.title}</span>
						<span className="text-gray-500 text-sm">{service.description}</span>
					</Box>
				</CardContent>
			</CardActionArea>
		</Card>
	)
}
