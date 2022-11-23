import React from 'react'
import type { NextPage } from 'next'
import Navbar from '../../components/Navbar'
import Profile from '../../components/Profile'

const ProfilePage: NextPage = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <Navbar/>
      <Profile/>
    </div>
  )
}

export default ProfilePage
