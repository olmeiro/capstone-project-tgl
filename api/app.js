const express = require('express')
const cors = require("cors");
const http = require("http")
const { Server } = require("socket.io")

const router = require("./src/routes/index");
const app = express()

const serverHttp = http.createServer(app)
const io = new Server(serverHttp)

app.use(cors());
app.use(express.json());
app.use(router);

module.exports = app;