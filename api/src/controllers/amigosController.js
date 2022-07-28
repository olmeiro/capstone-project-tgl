const AmigoService = require("../services/amigoService");
const { successResponse, errorResponse } = require("../responses/index");

const getAmigosPorUsuarioId = async (req, res) => {
    const { usuarioId } = req.body;
    try {
        const amigos = await AmigoService.getAmigosPorUsuarioId(usuarioId);
        successResponse(req, res, amigos);
    } catch (error) {
        errorResponse(req, res, error);
    }
}

const agregarAmigo = async (req, res) => {
    const { amigoId, usuarioId } = req.body;
    try {
        await AmigoService.agregarAmigo(amigoId, usuarioId);
        successResponse(req, res, "¡Friend has been successfully added!");
    } catch (error) {
        errorResponse(req, res, error);
    }
}

const deleteAmigo = async (req, res) => {
    const { amigoId, usuarioId } = req.body;
    try {
        await AmigoService.deleteAmigo(amigoId, usuarioId);
        successResponse(req, res, "¡Friend has been successfully deleted!");
    } catch (error) {
        errorResponse(req, res, error);
    }
}

module.exports = {
    getAmigosPorUsuarioId,
    agregarAmigo,
    deleteAmigo
}