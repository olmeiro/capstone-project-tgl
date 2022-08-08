const boom = require("@hapi/boom");
const { models } = require("../db/sequelize");
const { User, Post } = models;

class FavoriteService {
    constructor() {

    }

    static async getFavoritesByUserId(id) {

        try {
            console.log("usuario", id)
            const user = await User.findByPk(id);
            let favorites = user.favorites;
            favorites = favorites.map(async id => await Post.findByPk(id));
            favorites = Promise.all(favorites);
            return favorites;
        } catch (error) {
            throw boom.internal(error.message);
        }
    }

    static async addFavorite(postId, id) {
        try {

            const user = await User.findByPk(id);
            const checkFavorite = user.favorites.filter(idFavorite => idFavorite == postId)
            if (checkFavorite.length == 0) {
                const favorites = [...user.favorites, postId];
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