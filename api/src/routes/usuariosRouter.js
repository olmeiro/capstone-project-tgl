const express = require("express");
const router = express.Router();
const upload = require("../multer/multerConfig");

const {
    getUsuariosTodos,
    getUsuariosPorAlias,
    getUsuarioPorId,
    postUsuario,
    putUsuarioPorId,
    deleteUsuarioPorId
} = require("../controllers/usuariosController");

router.get("/todos", getUsuariosTodos);
router.get("/poralias/:alias", getUsuariosPorAlias);
router.get("/porid", getUsuarioPorId)
router.post("/", postUsuario);
router.put("/", upload.array("file", 2), putUsuarioPorId);
router.delete("/", deleteUsuarioPorId);


module.exports = router