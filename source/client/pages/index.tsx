import React from 'react'
import type { NextPage } from 'next'

import Navbar from '../components/Navbar'
import UseFor from '../components/UseFor'

import CircularProgress from '@mui/material/CircularProgress'

import { AuthContext } from "../context/AuthContext"

const Home: NextPage = () => {

  return (
    <div className="w-full h-full flex flex-col">
      <Navbar/>
      <UseFor/>
    </div>
  )
}

export default Home
