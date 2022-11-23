import React, { useEffect, useState } from "react"

import axios from "axios"

import { Button, Alert, Box } from "@mui/material"

import { useRouter } from "next/router"

export default function SessionCard({session}){
    const [loading, setLoading] = useState(true)
    const [profile, setProfile] = useState(null)
    const router = useRouter()

    useEffect(() => {
        axios.get(`/api/profile/${session.mentorId}`)
        .then((response) => {
            setProfile(response.data.response.profile)
            setLoading(false)
        })

        // get the name of the mentor from session.mentorId
    }, [])

    function joinSession(){
        router.push(`/session/${session.id}`)
    }
    if(loading) return <p>Loading ..</p>
    return (
        <Box className="flex justify-center w-[800px] pt-1">
            <Alert className="w-full flex items-center" severity="info">Your mentor {profile.name} has started a session <Button onClick={joinSession}>JOIN</Button></Alert>
        </Box>
        )
}
