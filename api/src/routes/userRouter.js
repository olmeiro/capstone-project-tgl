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
    putProfilePhotoUser,
    deleteUserById,
    loginUser,
    renewToken,
} = require("../controllers/userController");

router.get("/all", getAllUsers);
router.get("/bylias/:alias", getUserByAlias);
router.get("/byid", getUserById)
router.post("/", postUser);
router.put("/", upload.array("file", 2), putUserById);
router.put("/profilephoto", upload.single("file"), putProfilePhotoUser);
router.delete("/", deleteUserById);
router.post("/login", loginUser); 
router.get("/renew", validarJWT, renewToken);  


module.exports = router