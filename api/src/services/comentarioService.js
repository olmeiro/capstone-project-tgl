const bomm = require("@hapi/boom");
const { models } = require("../db/sequelize");
const { Comentario, Publicacion } = models;

class ComentarioService {
    constructor() {

    }

    static async getComentariosPorPublicacion(publicacionId) {
        const comentarios = await Comentario.findAll();
        const comentariosFiltrador = comentarios.filter(comentario => comentario.PublicacionId == publicacionId);
        return comentariosFiltrador;
    }

    static async postComentario(comentario) {
        const comentarioCreado = await Comentario.create(comentario);
        return comentarioCreado;
    }

    static async putComentario(comentario, id) {
        await Comentario.update({ comentario }, { where: { id } })
    }

    static async deleteComentario(id) {
        await Comentario.destroy({ where: { id } });
    }
}

module.exports = ComentarioService;