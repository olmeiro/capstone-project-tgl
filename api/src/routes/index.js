const express = require("express");
const router = express.Router();


const userRouter = require("./userRouter");
const publicacionesRouter = require("./publicacionesRouter")
const comentariosRouter = require("./comentariosRouter");
const amigosRouter = require("./amigosRouter");
const favoritosRouter = require("./favoritosRouter");


router.use("/usuarios", userRouter)

router.use("/publicaciones", publicacionesRouter)
router.use("/comentarios", comentariosRouter)
router.use("/amigos", amigosRouter)
router.use("/favoritos", favoritosRouter)

module.exports = router