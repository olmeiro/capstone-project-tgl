const ComentarioService = require("../services/comentarioService");
const PublicacionService = require("../services/publicacionService");
const UsuarioService = require("../services/usuarioService");

const { successResponse, errorResponse } = require("../responses/index");

const getComentariosPorPublicacion = async (req, res) => {
    try {
        const { publicacionId } = req.body;
        const comentarios = await ComentarioService.getComentariosPorPublicacion(publicacionId);
        successResponse(req, res, comentarios);
    } catch (error) {
        errorResponse(req, res, error);
    }
}

const postComentario = async (req, res) => {
    const {
        comentario,
        usuarioLogeadoId,
        publicacionId
    } = req.body;
    try {
        const comentarioCreado = await ComentarioService.postComentario({
            comentario,
            fecha: new Date().toUTCString().split(",")[1].split("GMT")[0].trim()
        })
        const usuarioLogeado = await UsuarioService.getUsuarioPorId(usuarioLogeadoId);
        const publicacion = await PublicacionService.getPublicacionPorId(publicacionId);
        await usuarioLogeado.addComentario(comentarioCreado);
        await publicacion.addComentario(comentarioCreado);
        successResponse(req, res, comentarioCreado);
    } catch (error) {
        errorResponse(req, res, error);
    }
}

const putComentario = async (req, res) => {
    const { comentarioNuevo, comentarioId } = req.body;
    try {
        await ComentarioService.putComentario(comentarioNuevo, comentarioId);
        successResponse(req, res,"¡Comment has been successfully updated!");
    } catch (error) {
        errorResponse(req, res, error);
    }
}

const deleteComentario = async (req, res) => {
    const { comentarioId } = req.body;
    try {
        await ComentarioService.deleteComentario(comentarioId);
        successResponse(req, res,"¡Comment has been successfully deleted!");
    } catch (error) {
        errorResponse(req, res, error);
    }
}

module.exports = {
    getComentariosPorPublicacion,
    postComentario,
    putComentario,
    deleteComentario
}