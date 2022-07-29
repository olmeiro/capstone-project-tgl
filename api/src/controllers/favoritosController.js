const FavoritoService = require("../services/favoritoService");
const { successResponse, errorResponse } = require("../utils/responses/index");

const getFavoritos = async (req, res) => {
    const { usuarioId } = req.body;
    try {
        const favoritos = await FavoritoService.getFavoritosPorUsuarioId(usuarioId);
        successResponse(req, res, favoritos);
    } catch (error) {
        errorResponse(req, res, error);
    }
}

const agregarFavorito = async (req, res) => {
    const { publicacionId, usuarioId } = req.body;
    try {
        await FavoritoService.agregarFavorito(publicacionId, usuarioId);
        successResponse(req, res, "Favorite has been successfully added");
    } catch (error) {
        errorResponse(req, res, error);
    }
}

const deleteFavoritos = async (req, res) => {
    const { publicacionId, usuarioId } = req.body;
    try {
        await FavoritoService.deleteFavorito(publicacionId, usuarioId);
        successResponse(req, res, "Favorite has been successfully deleted");
    } catch (error) {
        errorResponse(req, res, error);
    }
}

module.exports = {
    getFavoritos,
    agregarFavorito,
    deleteFavoritos
}