import React from 'react'
import type { NextPage } from 'next'
import Navbar from '../../components/Navbar'
import Settings from '../../components/Settings'

const SettingsPage: NextPage = () => {
  return (
    <div className="flex flex-col">
      <Navbar/>
      <Settings/>
    </div>
  )
}

export default SettingsPage
