const express = require("express")
const http = require("http")
const socketIO = require("socket.io");
const path = require("path")

const port = process.env.PORT || 3000

const app = express()

const server = http.createServer(app)

const io = socketIO(server)

app.use(express.static(path.join(__dirname, "public")))

io.on("connection", (socket) => {
    console.log("New connection", socket.id)

    socket.on("client:message", (data) => {
        io.sockets.emit("server:message", data)
    })

    socket.on("client:typing", (data) => {
        socket.broadcast.emit("server:typing", data)
    })

    socket.on("disconnect", () => {
        console.log("Disconnect");
    })
})

server.listen(port, () => {
    console.log("Server is running on port:", port);
})