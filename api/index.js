// en este archivo van a ir todos los middelwars y las rutas iniciales
const express = require('express');
const cors = require("cors");
const usuarioRouter = require("./src/routes/usuario");
const publicacionRouter = require("./src/routes/publicacion");
const comentarioRouter = require("./src/routes/comentario");
const amigoRouter = require("./src/routes/amigo");
const favoritoRouter = require("./src/routes/favorito");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/usuario", usuarioRouter);
app.use("/publicacion", publicacionRouter);
app.use("/comentario", comentarioRouter);
app.use("/amigo", amigoRouter);
app.use("/favorito", favoritoRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
