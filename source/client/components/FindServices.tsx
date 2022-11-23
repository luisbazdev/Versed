import ServiceCard from './ServiceCard'
import axios from "axios"
import { useEffect, useState } from 'react'

export default function FindServices(){
	const [services, setServices] = useState([])

	useEffect(() => {
		axios.get("/api/services")
		.then((response) => {
			setServices(response.data.response)
		})
	}, [])

	return (
		<div className="p-8 w-full h-full grid grid-rows-[auto_1fr] mt-[62px]">
			<div className="pb-2 border-b border-gray-300">
				<h2 className="text-xl font-semibold">Find the best online mentoring for you</h2>
			</div>
			<div className="w-full h-full grid grid-cols-[auto_auto_auto_auto] justify-center pt-8 gap-y-4 gap-x-2">
				{ services?.map((service) => <ServiceCard key={service.id} service={service}/>) }
			</div>
		</div>
	)
}
