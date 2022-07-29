const ComentarioService = require("../services/commentService");
const PostService = require("../services/postService");
const UserService = require("../services/userService");

const { successResponse, errorResponse } = require("../utils/responses/index");

const getCommentsByPost = async (req, res) => {
    try {
        const { publicacionId } = req.body;
        const comentarios = await ComentarioService.getCommentsByPost(publicacionId);
        successResponse(req, res, comentarios);
    } catch (error) {
        errorResponse(req, res, error);
    }
}

const uploadPost = async (req, res) => {
    const {
        comentario,
        usuarioLogeadoId,
        publicacionId
    } = req.body;
    try {
        const comentarioCreado = await ComentarioService.uploadPost({
            comentario,
            fecha: new Date().toUTCString().split(",")[1].split("GMT")[0].trim()
        })
        const usuarioLogeado = await UserService.getUsuarioPorId(usuarioLogeadoId);
        const publicacion = await PostService.getPostById(publicacionId);
        await usuarioLogeado.addComentario(comentarioCreado);
        await publicacion.addComentario(comentarioCreado);
        successResponse(req, res, comentarioCreado);
    } catch (error) {
        errorResponse(req, res, error);
    }
}

const putComment = async (req, res) => {
    const { comentarioNuevo, comentarioId } = req.body;
    try {
        await ComentarioService.putComment(comentarioNuevo, comentarioId);
        successResponse(req, res,"¡Comment has been successfully updated!");
    } catch (error) {
        errorResponse(req, res, error);
    }
}

const deleteComment = async (req, res) => {
    const { comentarioId } = req.body;
    try {
        await ComentarioService.deleteComment(comentarioId);
        successResponse(req, res,"¡Comment has been successfully deleted!");
    } catch (error) {
        errorResponse(req, res, error);
    }
}

module.exports = {
    getCommentsByPost,
    uploadPost,
    putComment,
    deleteComment
}