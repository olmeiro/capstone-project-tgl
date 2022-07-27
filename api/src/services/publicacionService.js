const bomm = require("@hapi/boom");
const { models } = require("../db/sequelize");
const { Publicacion } = models;

class PublicacionService {
    constructor() {

    }

    static async getPublicacionesTodas() {
        const publicacionesTodas = await Publicacion.findAll();
        return publicacionesTodas;
    }

    static async getPublicacionesPorUsuario(UsuarioId) {
        const publicacionPorUsusuario = await Publicacion.findAll({ where: { UsuarioId } });
        return publicacionPorUsusuario;
    }

    static async getPublicacionPorId(publicacionId) {
        const publicacion = await Publicacion.findByPk(publicacionId);
        return publicacion;
    }

    static async postPublicacion(nuevaPublicacion) {
        const publicacion = await Publicacion.create(nuevaPublicacion);
        return publicacion;
    }

    static async putPublicacion(descripcion, id) {
        await Publicacion.update({ descripcion }, { where: { id } });
    }

    static async deletePublicacion(publicacionId) {
        await Publicacion.destroy(publicacionId);
    }
}

module.exports = PublicacionService;