const express = require("express");
const router = express.Router();
const {
    getUsuarios,
    getUsuarioPorId,
    getUsuarioPorAlias,
    postUsuario,
    putUsuario,
    deleteUsuario
} = require("../controllers/usuarioController");

router.get("/todos",getUsuarios);
router.get("/detalle/:id",getUsuarioPorId);
router.get("/",getUsuarioPorAlias); // para buscar por query con el alias
router.post("/",postUsuario);
router.put("/:id",putUsuario);
router.delete("/:id",deleteUsuario);

module.exports = router;