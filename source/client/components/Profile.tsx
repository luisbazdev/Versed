import React, { useEffect, useState } from "react"
import axios from "axios"
import Image from 'next/image'
import PlaceIcon from '@mui/icons-material/Place'
import HeadlessServiceCard from './HeadlessServiceCard'
import { Container, Box } from '@mui/material'

export default function Profile(){
    const [ profile, setProfile ] = useState(null)
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        axios.get("/api/profile")
        .then((response) => {
            setProfile(response.data.data.profile)
            setLoading(false)
        })
    }, [])

    if(loading) return <p>Loading Profile</p>

    return (
        <Container className="font-main w-full h-full grid grid-rows-[auto_auto_auto_auto_auto] mt-[62px] gap-x-8 gap-y-4 px-[200px] py-4">
            <Box className="flex flex-col">
                <Box className="w-[120px] h-[120px] rounded-full">
                    <Image 
                    className='rounded-full'
                    width={120}
                    height={120}
                    src={profile?.picture}
                    />
                </Box>
                <span className="text-xl font-semibold">{profile?.name}</span>
                <span className="flex items-center text-xs text-gray-600"> <PlaceIcon color="disabled"/>{profile?.location}</span>
            </Box>

            <Box className="flex flex-col">
                <span className="text-lg font-semibold">About</span>  
                <span>{profile?.description}</span>
            </Box>

            <Box className="flex flex-col gap-2">
                <span className="text-lg font-semibold">Services</span>  
                <Box className="gap-4 grid grid-cols-[1fr_1fr_1fr]">
                    <HeadlessServiceCard/>
                    <HeadlessServiceCard/>
                    <HeadlessServiceCard/>
                </Box>
            </Box>
        </Container>
    )
}
