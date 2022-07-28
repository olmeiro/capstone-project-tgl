const boom = require("@hapi/boom");
const { models } = require("../db/sequelize");
const { Publicacion } = models;

class PublicacionService {
    constructor() {

    }

    static async getPublicacionesTodas() {
        try {
            const publicacionesTodas = await Publicacion.findAll();
            return publicacionesTodas;
        } catch (error) {
            throw boom.internal(error.message);
        }
    }

    static async getPublicacionesPorUsuario(UsuarioId) {
        try {
            const publicacionPorUsusuario = await Publicacion.findAll({ where: { UsuarioId } });
            return publicacionPorUsusuario;
        } catch (error) {
            throw boom.internal(error.message);
        }
    }

    static async getPublicacionPorId(publicacionId) {
        try {
            const publicacion = await Publicacion.findByPk(publicacionId);
            return publicacion;
        } catch (error) {
            throw boom.internal(error.message);
        }
    }

    static async postPublicacion(nuevaPublicacion) {
        try {
            const publicacion = await Publicacion.create(nuevaPublicacion);
            return publicacion;
        } catch (error) {
            throw boom.internal(error.message);
        }
    }

    static async putPublicacion(descripcion, id) {
        try {
            await Publicacion.update({ descripcion }, { where: { id } });
        } catch (error) {
            throw boom.internal(error.message);
        }
    }

    static async deletePublicacion(id) {
        try {
            await Publicacion.destroy({ where: { id } });
        } catch (error) {
            throw boom.internal(error.message);
        }
    }
}

module.exports = PublicacionService;