const { models } = require("../db/sequelize");
const bcrypt = require('bcryptjs')
const boom = require("@hapi/boom");

const { Usuario } = models;

class UsuarioService {
    constructor() {

    }

    static async getUsuariosTodos() {
        try {
            const usuariosTodos = await Usuario.findAll();
            if (usuariosTodos.length == 0) {
                throw boom.notFound("Users has not been found");
            }
            return usuariosTodos;
        } catch (error) {
            throw boom.internal(error.message);
        }
    }

    static async getUsuariosPorAlias(alias) {
        try {
            const usuario = await Usuario.findOne({ where: { alias } })
            if (!usuario) {
                throw boom.notFound(`The user with nickname ${alias} has not been found`);
            }
            return usuario;
        } catch (error) {
            throw boom.internal(error.message);
        }

    }

    static async getUsuarioPorId(id) {
        try {
            const usuario = await Usuario.findByPk(id);
            if (!usuario) {
                throw boom.notFound(`User with id ${id} not found`);
            }
            return usuario;
        } catch (error) {
            throw boom.internal(error.message);
        }
    }

    static async postUsuario(nuevoUsuario) {
        try {
            const encryptPassword = await bcrypt.hash(nuevoUsuario.contraseña, 14)
            const usuario = await Usuario.create({
                ...nuevoUsuario,
                contraseña: encryptPassword
            });
            return usuario;
        } catch (error) {
            throw boom.internal(error.message);
        }
    }

    static async putUsuarioPorId(nuevoUsuario, id) {
        try {
            await Usuario.update(nuevoUsuario, { where: { id } });
        } catch (error) {
            throw boom.internal(error.message);
        }
    }

    static async deleteUsuarioPorId(id) {
        try {
            await Usuario.destroy({ where: { id } });
        } catch (error) {
            throw boom.internal(error.message);
        }
    }

    static async login(alias, contraseña) {
        try {
            // existe alias
            const user = await Usuario.findOne({ where: { alias } })
            if (!user) {
                throw boom.notFound(`User with nickname ${alias} has not been found`);
            }
            // verificar contraseña
            const validPassword = bcrypt.compareSync(contraseña, user.contraseña)
            if (!validPassword) {
                throw boom.notFound(`Password is incorrect`);
            }
            return user;
        } catch (error) {
            throw boom.internal(error.message);
        }
    }
}

module.exports = UsuarioService;