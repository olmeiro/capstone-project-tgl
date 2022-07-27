const express = require("express");
const router = express.Router();

const {
    getPublicaciones,
    getPublicacionesPorUsuario,
    postPublicacion,
    putPublicacion,
    deletePublicacion
} = require("../controllers/publicacionesController");


router.get("/todas", getPublicaciones)
router.get("/porusuario", getPublicacionesPorUsuario);
router.post("/", postPublicacion)
router.put("/", putPublicacion)
router.delete("/", deletePublicacion)


module.exports = router