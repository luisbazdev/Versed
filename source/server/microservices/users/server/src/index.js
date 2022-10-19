const http = require("http")
const cors = require("cors")

const express = require("express")
const app = express()
app.use(cors())
app.get("/", (req, res) => res.json("wtfas"))

const server = http.createServer(app)

const socket = require("socket.io")
const io = socket(server, {
    cors: {
        origin: "*"
    }
})

io.on("connection", (socket) => {
    socket.on("offer candidate", (candidate) => {
        socket.broadcast.emit("offer candidate", candidate)
    })

    socket.on("answer candidate", (candidate) => {
        socket.broadcast.emit("answer candidate", candidate)
    })

    socket.on("call", (offer) => {
        socket.broadcast.emit("call", offer)
    })

    socket.on("answer", (offer) => {
        socket.broadcast.emit("answer", offer)
    })
})

server.listen(3005, () => console.log("Server running!"))
