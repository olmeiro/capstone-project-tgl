const boom = require("@hapi/boom");
const { models } = require("../db/sequelize");
const { Comentario } = models;

class ComentarioService {
    constructor() {

    }

    static async getComentariosPorPublicacion(publicacionId) {
        try {
            const comentarios = await Comentario.findAll();
            const comentariosFiltrador = comentarios.filter(comentario => comentario.PublicacionId == publicacionId);
            return comentariosFiltrador;
        } catch (error) {
            throw boom.internal(error.message);
        }
    }

    static async postComentario(comentario) {
        try {
            const comentarioCreado = await Comentario.create(comentario);
            return comentarioCreado;
        } catch (error) {
            throw boom.internal(error.message);
        }
    }

    static async putComentario(comentario, id) {
        try {
            await Comentario.update({ comentario }, { where: { id } })
        } catch (error) {
            throw boom.internal(error.message);
        }
    }

    static async deleteComentario(id) {
        try {
            await Comentario.destroy({ where: { id } });
        } catch (error) {
            throw boom.internal(error.message);
        }
    }
}

module.exports = ComentarioService;