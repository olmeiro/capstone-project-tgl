const AmigoService = require("../services/amigoService");

const getAmigosPorUsuarioId = async (req, res) => {
    const { usuarioId } = req.body;
    const amigos = await AmigoService.getAmigosPorUsuarioId(usuarioId);
    res.json(amigos);
}

const agregarAmigo = async (req, res) => {
    const { amigoId, usuarioId } = req.body;
    await AmigoService.agregarAmigo(amigoId, usuarioId);
    res.json("amigo agregado correctamente");
}

const deleteAmigo = async (req, res) => {
    const { amigoId, usuarioId } = req.body;
    await AmigoService.deleteAmigo(amigoId, usuarioId);
    res.json("amigo eliminado correctamente");
}

module.exports = {
    getAmigosPorUsuarioId,
    agregarAmigo,
    deleteAmigo
}