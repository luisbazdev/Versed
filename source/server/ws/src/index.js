const http = require("http")
const cors = require("cors")

const express = require("express")
const app = express()
app.use(cors())
app.get("/", (req, res) => res.json("ok"))

const server = http.createServer(app)

const socket = require("socket.io")
const io = socket(server, {
    cors: {
        origin: "*"
    }
})

io.on("connection", (socket) => {
    socket.on("start session", (session) => {
        socket.to(session.studentId).emit("start session", session)
    })

    socket.on("end session", (session) => {
        socket.to(session.studentId).emit("end session", session)
    })

    socket.on("join mentoring", (id) => {
        socket.join(id)
    })

    socket.on("offer candidate", (candidate, room) => {
        socket.to(room).emit("offer candidate", candidate)
    })

    socket.on("answer candidate", (candidate, room) => {
        socket.to(room).emit("answer candidate", candidate)
    })

    socket.on("call", (offer, room) => {
        socket.to(room).emit("call", offer)
    })

    socket.on("answer", (offer, room) => {
        socket.to(room).emit("answer", offer)
    })
})

server.listen(3005, () => console.log("Server running!"))
