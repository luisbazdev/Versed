import React from 'react'
import type { NextPage } from 'next'
import Navbar from '../../components/Navbar'
import Mentorships from '../../components/Mentorships'
import { AuthContext } from "../../context/AuthContext";

const MentorshipsPage: NextPage = () => {
  const { user, isLoading } = React.useContext(AuthContext)
  if(isLoading)
  	return <p>loading xdxd</p>

  return (
    <div className="flex flex-col">
      <Navbar/>
      <Mentorships/>
    </div>
  )
}

export default MentorshipsPage
