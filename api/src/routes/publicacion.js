const express = require("express");
const router = express.Router();
const {
    getPublicacions,
    getPublicacionPorId,
    postPublicacion,
    putPublicacion,
    deletePublicacion,
    getImagen
} = require("../controllers/publicacionController");
const upload = require("../multer/multer.js");

router.get("/todos", getPublicacions);
router.get("/imagen/:nombreImagen", getImagen);
router.get("/detalle/:id", getPublicacionPorId);
router.post("/", upload.single("file"), postPublicacion);
router.put("/:id", putPublicacion);
router.delete("/:id", deletePublicacion);

module.exports = router;