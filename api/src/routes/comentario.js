const express = require("express");
const router = express.Router();

const {
    getComentarios,
    getComentarioPorId,
    postComentario,
    putComentario,
    deleteComentario
} = require("../controllers/comentarioController");

router.get("/todos",getComentarios);
router.get("/detalle/:id",getComentarioPorId);
router.post("/",postComentario);
router.put("/:id",putComentario);
router.delete("/:id",deleteComentario);

module.exports = router;