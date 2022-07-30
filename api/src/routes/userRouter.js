const express = require("express");
const router = express.Router();
const upload = require("../multer/multerConfig");
const { validarJWT } = require("../middleware/validar-jwt");
const { validateDataJoi } = require("../middleware/validateDataJoi");
const { userSchema } = require("../utils/joiSchemas/usersJoiSchema");

const {
    getAllUsers,
    getUserByAlias,
    getUserById,
    postUser,
    putUserById,
    deleteUserById,
    loginUser,
    renewToken,
} = require("../controllers/userController");

router.get("/all", getAllUsers);
router.get("/byalias/:alias", getUserByAlias);
router.get("/byid", getUserById)
router.post("/", postUser);
// router.post("/", validateDataJoi(userSchema, "body"), postUser);
router.put("/", upload.array("file", 2), putUserById);
router.delete("/", deleteUserById);
router.post("/login", loginUser);
router.get("/renew", validarJWT, renewToken);


module.exports = router