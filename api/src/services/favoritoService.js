const bomm = require("@hapi/boom");
const { models } = require("../db/sequelize");
const { Usuario, Publicacion } = models;

class FavoritoService {
    constructor() {

    }

    static async getFavoritosPorUsuarioId(id) {
        const usuario = await Usuario.findByPk(id);
        let favoritos = usuario.favoritos;
        favoritos = favoritos.map(async id => await Publicacion.findByPk(id));
        favoritos = Promise.all(favoritos);
        return favoritos;
    }

    static async agregarFavorito(publicacionId, id) {
        const usuario = await Usuario.findByPk(id);
        const favoritos = [...usuario.favoritos, publicacionId];
        if (!usuario.favoritos.includes(publicacionId)) {
            await Usuario.update({ favoritos }, { where: { id } })
        }
    }

    static async deleteFavorito(publicacionId, id) {
        const usuario = await Usuario.findByPk(id);
        const favoritos = usuario.favoritos.filter(favorito => favorito != publicacionId);
        await Usuario.update({ favoritos }, { where: { id } });
    }
}

module.exports = FavoritoService;