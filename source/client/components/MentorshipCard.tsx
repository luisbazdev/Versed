import React, { useEffect, useState } from 'react'
import axios from "axios"
import { AuthContext } from "../context/AuthContext"
import Image from 'next/image'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import IconButton from '@mui/material/IconButton'
import { useUser } from '@auth0/nextjs-auth0'
import EmailIcon from '@mui/icons-material/Email'
import { Container, Box } from "@mui/material"
import { useRouter } from "next/router"
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

export default function MentorshipCard({mentorship}){
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    function handleClose(){
      setAnchorEl(null)
    }
    const [ loading, setLoading ] = useState(true)
    const { sub } = React.useContext(AuthContext)
    const { user, error, isLoading } = useUser();

    const [ profile, setProfile ] = useState(null)
    const [ service, setService ] = useState(null)

    const router = useRouter()

    let date = JSON.stringify(new Date())

    function init(){
        axios.get(`/api/user/${mentorship.mentorId}`)
        .then((response) => setProfile(response.data.data.user.profile))

        axios.get(`/api/services/${mentorship.serviceId}`)
        .then((response) => setService(response.data.service))
    }
    useEffect(() => {
        init()
		setLoading(false)
	}, [])

    const startSession = () => {
        axios.post("/api/sessions", {
            studentId: mentorship.studentId,
            mentorshipId: mentorship.id
        }).then((response) => {
            // Emit "start session" event 
            // Redirect the mentor to the newly created session
            let session = response.data.response.session
            router.push(`/session/${session.id}`)
        })
    }

    if(loading) return <p>page loading</p>

    return (
        <Box className="w-[800px] grid grid-cols-[auto_1fr_auto] gap-2 p-6 shadow rounded-lg">
            <Box className="w-[80px] h-[80px] bg-gray-200 rounded-full">
                <Image 
                className='rounded-full'
                width={80}
                height={80}
                src={profile?.picture}
                />
            </Box>
            <Box className="flex flex-col items-start">
                <span className="font-semibold text-lg">{profile?.name}</span>
                <span className="text-sm">Teaches you {service?.signature}</span>
                <span className="text-sm">Last Session: 1 week ago</span>

                <span className="text-sm text-gray-600">Expires in {mentorship.expiresAt}</span>

            </Box>
            <Box className="flex items-center justify-center">
                <IconButton>
                    <EmailIcon/>                                                               
                </IconButton>   
                <IconButton className="flex flex-col">
                    <MoreHorizIcon onClick={handleClick}/>                
                        <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          'aria-labelledby': 'basic-button',
                        }}
                        PaperProps={{
                        elevation: 0,
                        sx: {
                          overflow: 'visible',
                          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                          mt: 1.5,
                          '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                              zIndex: 0,
                          },
                        },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                        { true && <MenuItem onClick={startSession}>Start Session</MenuItem>}
                        { false && <MenuItem></MenuItem>}
                    </Menu>                                               
                </IconButton>      
            </Box>
        </Box>
    )
}
