const boom = require("@hapi/boom"); // para manejar los errores
const usuarioSchema = require("../db/models/usuarioModel");

class PublicacionService {
    constructor() {

    }
    getUsuarioPorAlias(alias) {
        return usuarioSchema.findOne(alias);
    }


}

module.exports = PublicacionService;