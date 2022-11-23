import axios from "axios"
import { Box, Container, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import Button from '@mui/material/Button';

export default function TellUsAboutYou(){
	const [name, setName] = useState("")
	const [description, setDescription] = useState("")
	const [location, setLocation] = useState("")

	function handleChangeName(e){
		setName(e.target.value)
	}
	function handleChangeDescription(e){
		setDescription(e.target.value)
	}
	function handleChangeLocation(e){
		setLocation(e.target.value)
	}
	function submit(){
		axios.post("/api/profile", {
			name,
			description,
			location
		}, {
			withCredentials: true
		}).then((res) => console.log(res))
	}

	return (
		<Container className="p-[25px] w-full h-full flex flex-col items-center justify-center">
			<Box className="flex flex-col w-[550px] gap-4">
				<span className="text-lg font-semibold">We need to know more about you</span>

				<TextField 
				label="Full Name" 
				value={name}
				onChange={handleChangeName}
            	required
            	helperText="What's your name?"
				/>

				<TextField 
        		rows={10} 
            	label="Description" 
				value={description}
				onChange={handleChangeDescription}
            	required 
            	multiline 
            	helperText="What do you do?"
				/>

				<TextField 
				label="Location" 
				value={location}
				onChange={handleChangeLocation}
            	required
            	helperText="Where are you from?"
				/>

				<Button 
      			disabled={description == "" || location == ""}
          		onClick={submit}>
      			Done
      			</Button>
			</Box>
		</Container>
    )
}
