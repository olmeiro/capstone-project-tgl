const boom = require("@hapi/boom");
const { models } = require("../db/sequelize");
const { User, Publicacion } = models;

class FavoriteService {
    constructor() {

    }

    static async getFavoritesByUserId(id) {
        try {
            const user = await User.findByPk(id);
            let favorites = user.favorites;
            favorites = favorites.map(async id => await Publicacion.findByPk(id));
            favorites = Promise.all(favorites);
            return favorites;
        } catch (error) {
            throw boom.internal(error.message);
        }
    }

    static async addFavorite(postId, id) {
        try {
            const user = await User.findByPk(id);
            const favorites = [...user.favorites, postId];
            if (!user.favorites.includes(postId)) {
                await User.update({ favorites }, { where: { id } })
            }
        } catch (error) {
            throw boom.internal(error.message);
        }
    }

    static async deleteFavorite(postId, id) {
        try {
            const user = await User.findByPk(id);
            const favorites = user.favorites.filter(favorite => favorite != postId);
            await User.update({ favorites }, { where: { id } });
        } catch (error) {
            throw boom.internal(error.message);
        }
    }
}

module.exports = FavoriteService;