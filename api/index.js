const express = require('express')
const {findAllUsers, findUser, createUser} = require('../api/src/mongoDB/functions')

const app = express()
const port = 3000


app.get('/', async (req, res) => {
  res.json( await findAllUsers())
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
