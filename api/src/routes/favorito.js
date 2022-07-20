const express = require("express");
const router = express.Router();

const {
    getFavoritos,
    getFavoritoPorId,
    postFavorito,
    putFavorito,
    deleteFavorito
} = require("../controllers/favoritoController");

router.get("/todos",getFavoritos);
router.get("/detalle/:id",getFavoritoPorId);
router.post("/",postFavorito);
router.put("/:id",putFavorito);
router.delete("/:id",deleteFavorito);

module.exports = router;