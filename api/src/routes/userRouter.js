const express = require("express");
const router = express.Router();
const upload = require("../multer/multerConfig");
const { validarJWT } = require("../middleware/validar-jwt");

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

router.get("/todos", getAllUsers);
router.get("/poralias/:alias", getUserByAlias);
router.get("/porid", getUserById)
router.post("/", postUser);
router.put("/", upload.array("file", 2), putUserById);
router.delete("/", deleteUserById);
router.post("/login", loginUser); 
router.get("/renew", validarJWT, renewToken);  


module.exports = router