const ComentarioService = require("../services/comentarioService");
const PublicacionService = require("../services/publicacionService");
const UsuarioService = require("../services/usuarioService");


const getComentariosPorPublicacion = async (req, res) => {
    const { publicacionId } = req.body;
    const comentarios = await ComentarioService.getComentariosPorPublicacion(publicacionId);
    res.json(comentarios);
}

const postComentario = async (req, res) => {
    const {
        comentario,
        usuarioLogeadoId,
        publicacionId
    } = req.body;

    const comentarioCreado = await ComentarioService.postComentario({
        comentario,
        fecha: new Date().toUTCString().split(",")[1].split("GMT")[0].trim()
    })

    const usuarioLogeado = await UsuarioService.getUsuarioPorId(usuarioLogeadoId);
    const publicacion = await PublicacionService.getPublicacionPorId(publicacionId);
    //agregamos al comentario creado los id del usuario logeado y la publicacion comentada
    await usuarioLogeado.addComentario(comentarioCreado);
    await publicacion.addComentario(comentarioCreado);

    res.json(comentarioCreado);
}

const putComentario = async (req, res) => {
    const { comentarioNuevo, comentarioId } = req.body;
    await ComentarioService.putComentario(comentarioNuevo, comentarioId);
    res.json("¡Comentario editado exitosamente!");
}

const deleteComentario = async (req, res) => {
    const { comentarioId } = req.body;
    await ComentarioService.deleteComentario(comentarioId);
    res.json("¡Comentario eliminado exitosamente!");
}

module.exports = {
    getComentariosPorPublicacion,
    postComentario,
    putComentario,
    deleteComentario
}