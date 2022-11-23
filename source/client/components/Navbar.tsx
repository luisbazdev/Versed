import React, { useEffect, useState } from "react"
import axios from "axios"
import Image from 'next/image'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useUser } from '@auth0/nextjs-auth0'

import { useRouter } from "next/router"
import { TextField, Container, Box, Button, Avatar, Badge } from '@mui/material'

export default function Navbar(){
    const [ profile, setProfile ] = useState(null)
    const [ loading, setLoading ] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null)
    
    const { user, isLoading } = useUser()
    
    const open = Boolean(anchorEl)

    const router = useRouter()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    function handleClose(){
      setAnchorEl(null)
    }
    function goToProfile(){
      router.push("/profile")
        setAnchorEl(null)
    }
    function goToSettings(){
      router.push("/settings")
      setAnchorEl(null)
    }

    useEffect(() => {
        axios.get("/api/profile")
        .then((response) => setProfile(response.data.data.profile))
    }, [])
    if(loading || isLoading) return <p>loading navbar</p>
    return (
        <Box className="grid grid-cols-[120px_1fr_70px] items-center w-full h-[62px] bg-[#FFFFFF] shadow fixed z-50">
            <Box className="flex items-center justify-center">
                <h1 className="font-semibold">VERSED</h1>
            </Box>
            { profile ? (<Box className="flex px-8 items-center justify-end text-[14px]">
                                <Button variant="filled" size="small" onClick={() => router.push("/explore")}>Explore</Button>
                <Badge badgeContent={1} color="primary">
                  <Button variant="filled" size="small" onClick={() => router.push("/mentorships")}>Mentorships</Button>
                </Badge>
                <Button variant="text" onClick={() => router.push("/service/create")}>Start Mentoring</Button>
            </Box>) 
            : (<Box className="flex px-8 items-center justify-end text-[14px]">
                <Button variant="filled" size="small" onClick={() => router.push("/explore")}>Explore</Button>
            </Box>) }

            { profile ? (<Box className="flex flex-col justify-center w-full h-full">
                <Box className="flex items-center justify-center w-[40px] h-[40px] rounded-full">
                    <Avatar
                    src={profile.picture}
                    onClick={handleClick} 
                    /> 
                </Box> 
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
                    <MenuItem onClick={goToProfile}>Profile</MenuItem>
                    <MenuItem onClick={goToSettings}>Settings</MenuItem>
                    <MenuItem><a href="/api/auth/logout">Logout</a></MenuItem>
                </Menu>
            </Box>)
            : (
            <Box className="flex items-center text-[14px]">
              <Button variant="text" onClick={() => router.push("/login")}>Login</Button>
            </Box>) }
        </Box>
    )
}
