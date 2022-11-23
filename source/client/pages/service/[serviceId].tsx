import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Navbar from '../../components/Navbar'
import Service from '../../components/Service'
import { useRouter } from 'next/router'
import axios from "axios"

const ServicePage: NextPage = () => {
	const [loading, setLoading] = useState(true)
	const [service, setService] = useState(null)

	const router = useRouter()
	const { serviceId } = router.query

	useEffect(() => {
		axios.get(`/api/services/${serviceId}`)
		.then((response) => {
			setService(response.data.service)
			setLoading(false)
		})
	}, [])

	if(loading) return <p>Loading :D</p>

  	return (
  	  <div className="w-full h-full flex flex-col">
  	    <Navbar/>
  	    <Service service={service}/>
  	  </div>
  	)
}

export default ServicePage
