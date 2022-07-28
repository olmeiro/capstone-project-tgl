const boom = require("@hapi/boom");
const { models } = require("../db/sequelize");
const { Usuario, Publicacion } = models;

class FavoritoService {
    constructor() {

    }

    static async getFavoritosPorUsuarioId(id) {
        try {
            const usuario = await Usuario.findByPk(id);
            let favoritos = usuario.favoritos;
            favoritos = favoritos.map(async id => await Publicacion.findByPk(id));
            favoritos = Promise.all(favoritos);
            return favoritos;
        } catch (error) {
            throw boom.internal(error.message);
        }
    }

    static async agregarFavorito(publicacionId, id) {
        try {
            const usuario = await Usuario.findByPk(id);
            const favoritos = [...usuario.favoritos, publicacionId];
            if (!usuario.favoritos.includes(publicacionId)) {
                await Usuario.update({ favoritos }, { where: { id } })
            }
        } catch (error) {
            throw boom.internal(error.message);
        }
    }

    static async deleteFavorito(publicacionId, id) {
        try {
            const usuario = await Usuario.findByPk(id);
            const favoritos = usuario.favoritos.filter(favorito => favorito != publicacionId);
            await Usuario.update({ favoritos }, { where: { id } });
        } catch (error) {
            throw boom.internal(error.message);
        }
    }
}

module.exports = FavoritoService;