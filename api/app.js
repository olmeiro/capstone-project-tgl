const express = require('express')
const cors = require("cors");
const http = require("http")
const { Server } = require("socket.io")

const router = require("./src/routes/index");
const app = express()

const serverHttp = http.createServer(app)
const io = new Server(serverHttp, {
    cors:{
        origin:"http://localhost:5173"// url del frontend 
    }
})

io.on("connection",(socket)=>{
    console.log("Sockect ID: ",socket.id)
    console.log("Usuario conectado!!")
})

app.use(cors());
app.use(express.json());
app.use(router);

module.exports = serverHttp;