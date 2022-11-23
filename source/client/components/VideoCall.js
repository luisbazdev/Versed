import React, { useEffect, useState, useRef, useContext } from "react"

import { Button, Alert, TextField, Tooltip, IconButton } from "@mui/material"

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import NoMeetingRoomIcon from '@mui/icons-material/NoMeetingRoom';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';

import Message from "./Message"

import io from "socket.io-client"
import axios from "axios"

import { useRouter } from "next/router"
import AuthContext from "../context/AuthContext"

let pc

// const socket = io("http://localhost:3005")

export default function VideoCall({id}){
    const socket = useContext(AuthContext)
    
    const [mentorOffer, setMentorOffer] = useState()
    const [studentAnswer, setStudentAnswer] = useState()

    // WebRTC connection established status
    const [onClassRoom, setOnClassRoom] = useState(false)
    // WebRTC media streams
    const [localStream, setLocalStream] = useState(null)
    const [remoteStream, setRemoteStream] = useState(null)

    const [loading, setLoading] = useState(true)

    const [user, setUser] = useState(null)
    const [session, setSession] = useState(null)

    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])

    const localVideoRef = useRef(null)
    const remoteVideoRef = useRef(null)

    const router = useRouter()

    // Turn on audio and video devices
    function turnOnMedia(){
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((stream) => setLocalStream(stream))
    }    
    // This is how you mute tracks
    function toggleMedia(){
        localStream.getTracks().forEach((track) => {
            // To mute audio only for example, right now it mutes all tracks (audio, video)
            // if(track.kind === "audio")
                track.enabled = !track.enabled
        })
    }
    // Start the class
    async function openClassRoom(){
        // Send offer candidates to receivers through Socket.IO signaling server,
        // gets fired after pc.setLocalDescription function is executed
        pc.onicecandidate = (event) => event.candidate ? socket.emit("offer candidate", event.candidate.toJSON(), id) : false 

        const offerDescription = await pc.createOffer({
            offerToReceiveAudio: true,
            offerToReceiveVideo: true
        })

        await pc.setLocalDescription(offerDescription)

        // Create an offer object from the previously created offer and send it to the receiver
        const offer = {
            sdp: offerDescription.sdp,
            type: offerDescription.type,
        }
        socket.emit("call", offer, id)
    }
    // Join the class
    async function joinClassRoom(){
        // Send answer candidates to caller through Socket.IO signaling server,
        // gets fired after pc.setLocalDescription function is executed
        pc.onicecandidate = (event) => event.candidate ? socket.emit("answer candidate", event.candidate.toJSON(), id) : false

        const answerDescription = await pc.createAnswer()

        await pc.setLocalDescription(answerDescription)

        // Create an answer object from the previously created answer and send it to the caller
        const answer = {
            type: answerDescription.type,
            sdp: answerDescription.sdp,
        }
        socket.emit("answer", answer, id)
        // Both parties are connected and sharing media
        setOnClassRoom(true)
    }

    function leaveClassRoom(){
        // ...
        router.push("/mentorships")
    }

    function sendMessage(){
        // setMessages(...message)
        setMessage("")
    }
    function init(){
        axios.get("/api/user").then((response) => setUser(response.data.data.user))
        axios.get(`/api/sessions/${id}`).then((response) => {
            setSession(response.data.response.session)
            setLoading(false)
        })
    }
    // Fetch the current logged in user details for later use
    useEffect(() => {
        setRemoteStream(new MediaStream())
        setLoading(false)
    }, [])
    useEffect(() => {
        if(id) init()
    }, [id])
    // STUN servers for WebRTC
    useEffect(() => {
        const servers = {
            iceServers: [{
                urls: ['stun:stun4.l.google.com:19302'],
            }],
            iceCandidatePoolSize: 10,
        }
        pc = new RTCPeerConnection(servers)     
    }, [])
    // Push local media tracks to peer connection
    useEffect(() => { 
        if(localStream != null){ 
            localStream.getTracks().forEach((track) => pc.addTrack(track, localStream))       
        }
    }, [localStream])
    // Pull tracks from remote stream and add them to remoteStream
    useEffect(() => {
        pc.ontrack = (e) => e.streams[0].getTracks().forEach((track) => remoteStream.addTrack(track)) 
    }, [remoteStream])
    // Socket.IO WebRTC events
    useEffect(() => {
        // student reconnects > resend details to student
        // mentor reconnects > resend details to mentor
        // both reconnect > reset connection
        if(id){
            // Join Socket.IO room with the same ID as the Session ID as
            socket.emit("join mentoring", id)

            socket.on("join mentoring", () => {
                // socket.emit("call", mentorOffer, id)
            })
            socket.on("offer candidate", (_candidate) => {
                const candidate = new RTCIceCandidate(_candidate)
                pc.addIceCandidate(candidate)
            })
            socket.on("answer candidate", (_candidate) => {  
                const candidate = new RTCIceCandidate(_candidate)
                pc.addIceCandidate(candidate)
            })
            socket.on("call", async (offer) => {
                // setMentorOffer(offer)
                await pc.setRemoteDescription(new RTCSessionDescription(offer))
            })
            socket.on("answer", (answer) => {
                setOnClassRoom(true)

                if(!pc.currentRemoteDescription){
                    const answerDescription = new RTCSessionDescription(answer)
                    pc.setRemoteDescription(answerDescription)
                }          
            })
        }

        return () => {
            socket.off();
        }
    }, [id])
    // Set media
    useEffect(() => {
        if(onClassRoom){
            let localVideo = localVideoRef.current
            let remoteVideo = remoteVideoRef.current
            // Assign both local and remote streams to src attribute of their respective video element
            localVideo.srcObject = localStream
            remoteVideo.srcObject = remoteStream
        }
    }, [onClassRoom])

    if(loading) return <p>not ready yet</p>

    return (
            <div className="w-full h-full grid grid-cols-[1fr_350px]">
                <div className="w-full h-full relative bg-black overflow-y-hidden">
                    <div className="w-[200px] h-[200px] bg-[#000000] absolute right-0 bottom-0 bg-transparent">
                        <video ref={localVideoRef} autoPlay playsInline
                        className="object-fill w-full h-full">
                        </video>
                    </div>

                    <div className="z-50 top-4 left-4 absolute">
                        <IconButton onClick={leaveClassRoom}>
			                <KeyboardBackspaceIcon fontSize="large" color="primary"/>
			            </IconButton>
                    </div>
                    <video ref={remoteVideoRef} autoPlay playsInline
                        className="object-fill w-full h-full">
                    </video>
     
                </div>

                <div className="grid grid-rows-[1fr_70px] overflow-y-auto">
                    <div className="overflow-y-auto">

                        { !onClassRoom && user?.occupation == "student" && <Alert severity="info">
                            Lesson has not started yet, communicate with your mentor using
                            the chatbox below and wait for your mentor to start the lesson.
                        </Alert> }         

                        { !onClassRoom && user?.occupation == "mentor" && <Alert severity="info">
                            You have not started any lesson yet. You can turn on your camera 
                            and microphone using the camera icon below and then hit the door icon
                            to start the lesson.
                        </Alert> }

                        { onClassRoom && user?.occupation == "student" && <Alert severity="info">
                            Lesson has started. You can communicate with the student
                            through text messages using the chatbox below.
                        </Alert> }

                        { onClassRoom && user?.occupation == "mentor" && <Alert severity="info">
                            Lesson has started! You can send text messages 
                            to your mentor using the chatbox below, any question you
                            have you can ask your mentor.
                        </Alert> }
                        <div className="flex items-center justify-center p-2">
                            { !localStream && <Tooltip title="Turn on media">
                                <IconButton onClick={turnOnMedia}>
                                    <VideocamIcon/>                                                             
                                </IconButton> 
                            </Tooltip>}
                            { localStream && <Tooltip title="Turn off media">
                                <IconButton>
                                    <VideocamOffIcon/>                                                             
                                </IconButton> 
                            </Tooltip>}
                            { user?.occupation == "mentor" && !onClassRoom && <Tooltip title="Open Classroom">
                                <IconButton disabled={!localStream} onClick={openClassRoom}>
                                    <MeetingRoomIcon/>                                                             
                                </IconButton> 
                            </Tooltip>}
                            { user?.occupation == "mentor" && onClassRoom && <IconButton>
                                <NoMeetingRoomIcon/>       
                            </IconButton>}
                            { mentorOffer && <IconButton onClick={joinClassRoom}>
                                <GroupAddIcon />
                            </IconButton>}
                            { onClassRoom && <IconButton>
                                <GroupRemoveIcon/>                              
                            </IconButton>} 
                        </div>
                        <div className="px-4 py-2 flex flex-col gap-2 overflow-y-auto">
                            {/*<p>{DateTime.fromISO(session?.created_at)}</p>*/}
                            {/* <Message message="I will be your mentor today on the field of Computer Science, so let the lesson begin!"/> */}
                        </div>
                    </div>

                    <div className="px-4 justify-center items-center grid grid-cols-[1fr_auto] border-t border-gray-300">
                        <TextField
                        placeholder="Send a message..."
                        variant="standard"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        />
                        <Button 
                        disabled={!message}
                        onClick={sendMessage}>
                            Send
                        </Button>
                    </div>

                </div>
            </div>

    )
}
