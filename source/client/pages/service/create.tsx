import React from 'react'
import type { NextPage } from 'next'
import Navbar from '../../components/Navbar'
import CreateService from '../../components/modals/CreateService'
import { AuthContext } from "../../context/AuthContext";

const CreateServicePage: NextPage = () => {
  const { user, isLoading } = React.useContext(AuthContext)

  if(isLoading)
  	return <p>loading xdxd</p>

  return (
    <div className="w-full h-full flex flex-col">
      <Navbar/>
      <CreateService/>
    </div>
  )
}

export default CreateServicePage
