import axios from "axios"

import { useState, useEffect, useContext } from "react"

import SessionCard from "./SessionCard"
import MentorshipCard from "./MentorshipCard"

import { Container, Box } from "@mui/material"

import AuthContext from "../context/AuthContext"

export default function Mentorships(){
    const socket = useContext(AuthContext)

    const [ loading, setLoading ] = useState(true)

    const [ sessions, setSessions ] = useState([])
    const [ mentorships, setMentorships ] = useState([])

    useEffect(() => {
        socket.on("start session", (session) => {
            // sessions.push(session)
        })

        socket.on("end session", () => {
            // ...
        })

        return () => {
            socket.off();
        }
    }, [])

    async function init(){
        await axios.get("/api/sessions")
        .then((response) => {
            setSessions(response.data.response)
        })
        
        await axios.get("/api/mentorships")
        .then((response) => {
            setMentorships(response.data.mentorships)
        })
        
        setLoading(false)
    }

    useEffect(function(){
        init()
    }, [])
    if(loading) return <p>Loading mentorships page</p>
    return (        
        <Container className="p-8 w-full h-full flex flex-col mt-[68px]">
        {/* Add Alert for both student and mentor of what they can do in this page */}

            <Box className="pb-2 border-b border-gray-300">
                <h2 className="text-xl font-semibold">My mentorships</h2>
            </Box>
            {/* Sessions container */}
            <Box className="h-auto flex flex-col items-center gap-2 w-full py-4">
                {sessions?.length > 0 && sessions.map(session => <SessionCard key={session.id} session={session}/>)}
            </Box>
            {/* Mentorships container */}
            <Box className="h-full flex flex-col items-center gap-4 py-2">
                {mentorships?.length > 0 && mentorships.map(mentorship => <MentorshipCard key={mentorship.id} mentorship={mentorship}/>)}
            </Box>
        </Container>
    )
}
