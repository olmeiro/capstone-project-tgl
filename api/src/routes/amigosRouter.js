const express = require("express");
const router = express.Router();

const {
    getAmigosPorUsuarioId,
    agregarAmigo,
    deleteAmigo
} = require("../controllers/amigosController");

router.get("/", getAmigosPorUsuarioId)
router.post("/", agregarAmigo)
router.delete("/", deleteAmigo)


module.exports = router