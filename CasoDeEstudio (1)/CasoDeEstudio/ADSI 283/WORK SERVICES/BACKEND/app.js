const express = require("express")
const bodyParser = require('body-parser')
const cors = require('cors')
const { API_VERSION } = require("./constants")
const { Server } = require("socket.io")
const http = require("http")

const app = express()

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: '*'
    }
})
io.on("connection", (socket) => {
    socket.on("message", (message, nickname, idWork, date) => {
        socket.broadcast.emit("message", {
            body: message,
            from: nickname,
            work: idWork,
            hour: date
        })
    })
})

//import routings
const authRoutes = require('./router/auth')
const userRoutes = require('./router/user')
const workRoutes = require('./router/work')
const postulateRoutes = require('./router/postulate')
const chatRoutes = require('./router/chat')

//Configuracion de body parser: esto para enviar json en el body
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//configure static folder
app.use(express.static("uploads"))

//cors: para que no de problemas hacer peticiones http
app.use(cors())

//configuracion de routing
app.use(`/api/${API_VERSION}`, authRoutes)
app.use(`/api/${API_VERSION}`, userRoutes)
app.use(`/api/${API_VERSION}`, workRoutes)
app.use(`/api/${API_VERSION}`, postulateRoutes)
app.use(`/api/${API_VERSION}`, chatRoutes)

module.exports = server