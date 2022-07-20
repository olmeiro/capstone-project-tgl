// en este archivo van a ir todos los middelwars y las rutas iniciales

const express = require('express');
const usuarioRouter = require("./src/routes/usuario");
const publicacionRouter = require("./src/routes/usuario");
const comentarioRouter = require("./src/routes/usuario");
const amigoRouter = require("./src/routes/usuario");
const favoritoRouter = require("./src/routes/usuario");

const { findAllUsers, findUser, createUser } = require('../api/src/mongoDB/functions');
const app = express();
const port = 3000;

app.use(express.json());

app.use("/usuario", usuarioRouter);
app.use("/publicacion", publicacionRouter);
app.use("/comentario", comentarioRouter);
app.use("/amigo", amigoRouter);
app.use("/favorito", favoritoRouter);


// app.get('/', async (req, res) => {
//   res.json(await findAllUsers())
// })

// app.post('/', async (req, res) => {
//   const  data  = req.body;
//   console.log("Dataaa",data)
//   res.json(await createUser(data))
// })

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
