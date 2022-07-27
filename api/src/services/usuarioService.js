const bomm = require("@hapi/boom");
const { models } = require("../db/sequelize");
const { Usuario } = models;

class UsuarioService {
    constructor() {

    }

    static async getUsuariosTodos() {
        const usuariosTodos = await Usuario.findAll();
        return usuariosTodos;
    }

    static async getUsuariosPorAlias(usuarioPorAlias){
        const usuario = await Usuario.findOne(usuarioPorAlias)
        return usuario;
    }

    static async getUsuarioPorId(id){
        const usuario = await Usuario.findByPk(id);
        return usuario;
    }

    static async postUsuario(nuevoUsuario) {
        const usuario = await Usuario.create(nuevoUsuario);
        return usuario;
    }

    static async putUsuarioPorId(nuevoUsuario, usuario) {
        await Usuario.update(nuevoUsuario, usuario);
    }

    static async deleteUsuarioPorId(usuarioId) {
        await Usuario.destroy(usuarioId);
    }
}

module.exports = UsuarioService;