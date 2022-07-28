const boom = require("@hapi/boom");
const { models } = require("../db/sequelize");
const { Usuario } = models;

class AmigoService {
    constructor() {

    }

    static async getAmigosPorUsuarioId(id) {
        try {
            const usuario = await Usuario.findByPk(id);
            let amigos = usuario.amigos;
            amigos = amigos.map(async id => await Usuario.findByPk(id));
            amigos = Promise.all(amigos);
            return amigos;
        } catch (error) {
            throw boom.internal(error.message);
        }
    }

    static async agregarAmigo(amigoId, id) {
        try {
            const usuario = await Usuario.findByPk(id);
            const amigos = [...usuario.amigos, amigoId];
            if (!usuario.amigos.includes(amigoId)) {
                await Usuario.update({ amigos }, { where: { id } })
            }
        } catch (error) {
            throw boom.internal(error.message);
        }
    }

    static async deleteAmigo(amigoId, id) {
        try {
            const usuario = await Usuario.findByPk(id);
            const amigos = usuario.amigos.filter(amigo => amigo != amigoId);
            await Usuario.update({ amigos }, { where: { id } });
        } catch (error) {
            throw boom.internal(error.message);
        }
    }

}

module.exports = AmigoService;