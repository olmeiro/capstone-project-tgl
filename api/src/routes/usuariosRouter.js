const express = require("express");
const router = express.Router();
const upload = require("../multer/multerConfig");
const { validarJWT } = require("../middleware/validar-jwt");
const { validateDataJoi } = require("../middleware/validateDataJoi");
const { userSchema } = require("../utils/joiSchemas/usersJoiSchema");

const {
    getUsuariosTodos,
    getUsuariosPorAlias,
    getUsuarioPorId,
    postUsuario,
    putUsuarioPorId,
    deleteUsuarioPorId,
    loginUsuario,
    revalidarToken
} = require("../controllers/usuariosController");

router.get("/todos", getUsuariosTodos);
router.get("/poralias/:alias", getUsuariosPorAlias);
router.get("/porid", getUsuarioPorId);
router.post("/", postUsuario);
// router.post("/", validateDataJoi(userSchema, "body"), postUsuario); // esta linea será descomentada cuando Joi este listo y cambiado el idioma
router.put("/", upload.array("file", 2), putUsuarioPorId);
router.delete("/", deleteUsuarioPorId);
router.post("/login", loginUsuario);

router.get("/renew", validarJWT, revalidarToken);


module.exports = router