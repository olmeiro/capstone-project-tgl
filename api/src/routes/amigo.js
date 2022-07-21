const express = require("express");
const router = express.Router();

const {
    getAmigos,
    getAmigoPorId,
    getAmigoPorAlias,
    postAmigo,
    putAmigo,
    deleteAmigo
} = require("../controllers/amigoController");

router.get("/todos", getAmigos);
router.get("/detalle/:id", getAmigoPorId);
router.get("/", getAmigoPorAlias); // para buscar por query
router.post("/", postAmigo);
router.put("/:id", putAmigo);
router.delete("/:id", deleteAmigo);

module.exports = router;