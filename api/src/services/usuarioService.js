const bomm = require("@hapi/boom");
const { models } = require("../db/sequelize");
const bcrypt = require('bcryptjs')


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
        console.log("nuevo", nuevoUsuario.contraseña)
        const encryptPassword = await bcrypt.hash(nuevoUsuario.contraseña, 14) 

        const usuario = await Usuario.create({
            ...nuevoUsuario,
            contraseña: encryptPassword
        });
        return usuario;
    }

    static async putUsuarioPorId(nuevoUsuario, id) {
        await Usuario.update(nuevoUsuario, { where: { id } });
    }

    static async deleteUsuarioPorId(id) {
        await Usuario.destroy({ where: { id } });
    }

    static async login(alias, contraseña) {
      try {
        // existe alias
        const user = await Usuario.findOne({where: {alias}})
        if (!user){
            console.log(`No se encontró el usuario con alias ${alias}`)
        }

        // verificar contraseña
        const validPassword = bcrypt.compareSync(contraseña, user.contraseña)

        if(!validPassword) {
            console.log("contraseña incorrecta")
        }

        return user
      } catch (error) {
        console.log(error)
      }
    }
}

module.exports = UsuarioService;