const express = require("express");
const router = express.Router();
const {
    getPublicacions,
    getPublicacionPorId,
    postPublicacion,
    putPublicacion,
    deletePublicacion
} = require("../controllers/publicacionController");

router.get("/todos",getPublicacions);
router.get("/detalle/:id",getPublicacionPorId);
router.post("/",postPublicacion);
router.put("/:id",putPublicacion);
router.delete("/:id",deletePublicacion);

module.exports = router;