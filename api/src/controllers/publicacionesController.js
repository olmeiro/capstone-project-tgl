const PublicacionService = require("../services/publicacionService");
const UsuarioService = require("../services/usuarioService");

const fs = require('fs');
const FormData = require('form-data');
const axios = require('axios')
const { API_KEY } = require("../config/index");

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

    const { path } = req.file;
    const {
        descripcion,
        usuarioLogeadoId
    } = req.body;

    const formData = new FormData();
    const foto64 = fs.readFileSync(path, { encoding: 'base64' });
    formData.append("image", foto64);

    const postToApi = await axios({
        method: 'post',
        url: `https://api.imgbb.com/1/upload?key=${API_KEY}`,
        headers: formData.getHeaders(),
        data: formData
    })
    const responseFromApi = postToApi.data
    const urlFoto = responseFromApi.data.url

    const publicacion = await PublicacionService.postPublicacion({
        descripcion,
        foto: urlFoto,
        fecha: new Date().toUTCString().split(",")[1].split("GMT")[0].trim()
    });

    const usuarioLogeado = await UsuarioService.getUsuarioPorId(usuarioLogeadoId)
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
    const { publicacionId } = req.body;
    await PublicacionService.deletePublicacion(publicacionId);
    res.json("¡Publicación eliminada exitosamente!");
}

module.exports = {
    getPublicaciones,
    getPublicacionesPorUsuario,
    postPublicacion,
    putPublicacion,
    deletePublicacion
}