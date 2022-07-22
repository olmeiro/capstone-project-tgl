const boom = require("@hapi/boom"); // para manejar los errores
const mongoose = require("../mongoose/conexion");

class UsuarioService {
    constructor() {

    }
    async getUsuarios() {
        const allUsuario = await models.Usuario.findAll();
        return allUsuario;
    }
    async postUsuario(){
        
    }
}

module.exports = UsuarioService;