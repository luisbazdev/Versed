import React, { useState } from 'react'
import type { NextPage } from 'next'
import VideoCall from '../../components/VideoCall'
import { useRouter } from 'next/router'

const SessionPage: NextPage = () => {
	const router = useRouter()
	const { sessionId } = router.query

  return (
    <div className="w-full h-full flex flex-col">
      <VideoCall id={sessionId}/>
    </div>
  )
}

export default SessionPage
