const express = require("express");
const router = express.Router();
const upload = require("../multer/multerConfig");
const { validarJWT } = require("../middleware/validar-jwt");
const { validateCreate } = require("../validators/users")

const {
    getAllUsers,
    getUserByAlias,
    getUserById,
    postUser,
    putUserById,
    putProfilePhotoUser,
    deleteUserById,
    loginUser,
    renewToken,
} = require("../controllers/userController");

router.get("/all", getAllUsers);
router.get("/byalias/:alias", getUserByAlias);
router.get("/byid/:id", getUserById)
router.post("/", validateCreate, postUser);
router.put("/", putUserById);
router.put("/profilephoto", upload.single("file"), putProfilePhotoUser);
router.delete("/:id", deleteUserById);
router.post("/login", loginUser);
router.get("/renew", validarJWT, renewToken);


module.exports = router