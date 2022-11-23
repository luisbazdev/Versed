import React, { useEffect, useState } from "react"

import axios from "axios"

import { Box, Container } from "@mui/material"

import { useUser } from '@auth0/nextjs-auth0'

import TellUsAboutYou from "./TellUsAboutYou"

export default function UseFor({children}){
	const { user, isLoading } = useUser();
	const [ userLoading, setUserLoading ] = useState(false)
	const [ _user, _setUser ] = useState(false)

	useEffect(() => {
		axios.get("/api/user")
		.then((response) => {
			if(response.data.data.success == true) _setUser(response.data.data.user)
			setUserLoading(false)
		})
	}, [])

	function createStudentAccount(){
		// set _user after completing the request
		axios.post("/api/user", { occupation: 'student'})
		.then((response) => console.log(response))
		.catch((error) => console.log(error))
	}
	function createMentorAccount(){
		// set _user after completing the request
		axios.post("/api/user", { occupation: 'mentor'})
		.then((response) => console.log(response))
		.catch((error) => console.log(error))
	}
	if(isLoading || userLoading) return <p>loading :D</p>
	if(!user || (_user && _user.profile) ) return children
	else if(!_user) return (
		<Container className="p-[25px] w-full h-full flex flex-col items-center">
     		<span className="font-semibold text-lg">What will you use Versed for?</span>     
			<Box className="flex">
				<Box onClick={createStudentAccount} className="grid grid-cols-[1fr_1fr] p-4" sx={{ maxWidth: 300 }}>
					<Box className="grid grid-cols-[1fr_1fr]">
					I'm a Student
					I'm looking for an experienced mentor to guide me on an assignment.
					</Box>
				</Box>
				<Box onClick={createMentorAccount} className="grid grid-cols-[1fr_1fr] p-4" sx={{ maxWidth: 300 }}>
					<Box className="grid grid-cols-[1fr_1fr]">
					I'm a Mentor
					I offer my knowledge to students on an assignment.
					</Box>
				</Box>
			</Box>
		</Container>
	)	
	else if(!_user.profile) return <TellUsAboutYou/>

}
