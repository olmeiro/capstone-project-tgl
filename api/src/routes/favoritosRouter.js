const express = require("express");
const router = express.Router();

const {
    getFavoritos,
    agregarFavorito,
    deleteFavoritos
} = require("../controllers/favoritosController");

router.get("/", getFavoritos)
router.post("/", agregarFavorito)
router.delete("/", deleteFavoritos)

module.exports = router