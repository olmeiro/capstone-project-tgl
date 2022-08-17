const FavoriteService = require("../services/favoriteService");
const { successResponse, errorResponse } = require("../utils/responses/index");

const getFavoritesByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const favorites = await FavoriteService.getFavoritesByUserId(userId);
        successResponse(req, res, favorites);
    } catch (error) {
        errorResponse(req, res, error);
    }
}
const addFavorite = async (req, res) => {
    const { postId, userId } = req.query;
    try {
        await FavoriteService.addFavorite(postId, userId);
        successResponse(req, res, "Favorite has been successfully added");
    } catch (error) {
        errorResponse(req, res, error);
    }
}
const deleteFavorite = async (req, res) => {
    const { postId, userId } = req.query;
    try {
        await FavoriteService.deleteFavorite(postId, userId);
        successResponse(req, res, "Favorite has been successfully deleted");
    } catch (error) {
        errorResponse(req, res, error);
    }
}

module.exports = {
    getFavoritesByUserId,
    addFavorite,
    deleteFavorite
}