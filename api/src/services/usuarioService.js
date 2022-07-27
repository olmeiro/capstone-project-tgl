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

    static async getUsuariosPorAlias(alias) {
        const usuario = await Usuario.findOne({ where: { alias } })
        return usuario;
    }

    static async getUsuarioPorId(id) {
        const usuario = await Usuario.findByPk(id);
        return usuario;
    }

    static async postUsuario(nuevoUsuario) {
        const usuario = await Usuario.create(nuevoUsuario);
        return usuario;
    }

    static async putUsuarioPorId(nuevoUsuario, id) {
        await Usuario.update(nuevoUsuario, { where: { id } });
    }

    static async deleteUsuarioPorId(id) {
        await Usuario.destroy({ where: { id } });
    }
}

module.exports = UsuarioService;