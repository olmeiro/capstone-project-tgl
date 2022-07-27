const express = require("express");
const router = express.Router();
const upload = require("../multer/multerConfig");

const {
    getPublicaciones,
    getPublicacionesPorUsuario,
    postPublicacion,
    putPublicacion,
    deletePublicacion
} = require("../controllers/publicacionesController");


router.get("/todas", getPublicaciones)
router.get("/porusuario", getPublicacionesPorUsuario);
router.post("/", upload.single("file"), postPublicacion)
router.put("/", putPublicacion)
router.delete("/", deletePublicacion)


module.exports = router