const express = require("express");
const router = express.Router();

const {
    getComentariosPorPublicacion,
    postComentario,
    putComentario,
    deleteComentario
} = require("../controllers/comentariosController");

router.get("/porpublicacion", getComentariosPorPublicacion)
router.post("/", postComentario)
router.put("/", putComentario)
router.delete("/", deleteComentario)


module.exports = router