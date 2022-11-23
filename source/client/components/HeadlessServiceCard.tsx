import { useEffect } from "react"
import { useUser } from '@auth0/nextjs-auth0'
import { useRouter } from "next/router"

import Rating from '@mui/material/Rating'
import Button from '@mui/material/IconButton'

export default function HeadlessServiceCard(){
	const { user, error, isLoading } = useUser();

    const router = useRouter()

	useEffect(() => {
		// Fetch the service here
	}, [])

	if(isLoading)
        return <h1>Loading</h1>

    function goToService(){
    	// router.push(`/service/${service.id}`)
    }

	return (
		<div className="shadow-lg flex flex-col border border-gray-200 rounded w-[300px] h-[auto]" onClick={goToService}>
			<div className="flex flex-col border-t border-gray-200 py-4 px-6">
				<Rating name="half-rating-read" value={4} precision={1} readOnly/>
				<span className="font-semibold">Backend Engineering Mastery</span>
				<span className="text-gray-500 text-sm">
					Backend Engineering is one of the most fundamental areas of
					Software Engineering, from creating a simple...
				</span>
			</div>
		</div>
	)
}