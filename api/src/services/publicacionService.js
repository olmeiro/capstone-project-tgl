const boom = require("@hapi/boom"); // para manejar los errores
const PublicacionSchema = require("../db/models/publicacionModel");

class PublicacionService {
    constructor() {

    }
    getPublicaciones() {

    }
    getPublicacionPorId(id) {
        return PublicacionSchema.findById(id);
    }
    postPublicacion(publicacion) {
        PublicacionSchema.create(publicacion)
    }
    updatePublicacion() {

    }
    deletePublicacion() {

    }
}

module.exports = PublicacionService;