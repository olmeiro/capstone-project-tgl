const express = require('express')
const cors = require("cors");
require('dotenv').config()
const router = require("./src/routes/index");
const app = express()
const { PORT } = require("./src/config/index");

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})