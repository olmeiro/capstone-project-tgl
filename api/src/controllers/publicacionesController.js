const PublicacionService = require("../services/publicacionService");
const UsuarioService = require("../services/usuarioService");

const getPublicaciones = async (req, res) => {
    const publicaciones = await PublicacionService.getPublicacionesTodas();
    res.json(publicaciones);
}

const getPublicacionesPorUsuario = async (req, res) => {
    const { usuarioId } = req.body;
    const publicaciones = await PublicacionService.getPublicacionesPorUsuario(usuarioId);
    res.json(publicaciones);
}

const postPublicacion = async (req, res) => {
    const {
        descripcion,
        foto,
        usuarioLogeadoId
    } = req.body;

    const publicacion = await PublicacionService.postPublicacion({
        descripcion,
        foto,
        fecha: new Date().toUTCString().split(",")[1].split("GMT")[0].trim()
    });

    const usuarioLogeado = await UsuarioService.getUsuarioPorId(usuarioLogeadoId)
    //agremamos a la publicacion el id del usuario que realizó dicha publicación
    await usuarioLogeado.addPublicacion(publicacion);

    res.json(publicacion);
}

const putPublicacion = async (req, res) => {
    const {
        id,
        descripcion,
    } = req.body
    
    await PublicacionService.putPublicacion(descripcion, id);

    res.json("¡Publicacion actualizada exitosamente!");
}

const deletePublicacion = async (req, res) => {
    const { id } = req.body;
    await PublicacionService.deletePublicacion({
        where: { id }
    });
    res.json("¡Publicación eliminada exitosamente!");
}

module.exports = {
    getPublicaciones,
    getPublicacionesPorUsuario,
    postPublicacion,
    putPublicacion,
    deletePublicacion
}