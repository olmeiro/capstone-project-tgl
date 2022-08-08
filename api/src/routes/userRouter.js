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
    putPhotoUserById,
    putProfilePhotoUser,
    deleteUserById,
    loginUser,
    renewToken,
} = require("../controllers/userController");

router.get("/all", getAllUsers);
router.get("/byalias/:alias", getUserByAlias);
router.get("/byid/:id", getUserById)
router.post("/", postUser);
router.put("/", putUserById);
// router.put("/photouser", upload.single("file"), putPhotoUserById);
router.put("/profilephoto", upload.single("file"), putProfilePhotoUser);
router.delete("/:id", deleteUserById);
router.post("/login", loginUser);
router.get("/renew", validarJWT, renewToken);


module.exports = router