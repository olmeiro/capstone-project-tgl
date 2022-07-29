const PublicacionService = require("../services/publicacionService");
const UserService = require("../services/userService");

const fs = require('fs');
const FormData = require('form-data');
const axios = require('axios')
const { API_KEY } = require("../config/index");
const { errorResponse, successResponse } = require("../responses");

const getPublicaciones = async (req, res) => {
    try {
        const publicaciones = await PublicacionService.getPublicacionesTodas();
        successResponse(req, res, publicaciones);
    } catch (error) {
        errorResponse(req, res, error);
    }
}

const getPublicacionesPorUsuario = async (req, res) => {
    const { usuarioId } = req.body;
    try {
        const publicaciones = await PublicacionService.getPublicacionesPorUsuario(usuarioId);
        successResponse(req, res, publicaciones);
    } catch (error) {
        errorResponse(req, res, error);
    }
}

const postPublicacion = async (req, res) => {
    const { path } = req.file;
    const {
        descripcion,
        usuarioLogeadoId
    } = req.body;
    try {
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

        const usuarioLogeado = await UserService.getUsuarioPorId(usuarioLogeadoId)
        await usuarioLogeado.addPublicacion(publicacion);
        successResponse(req, res, publicacion);
    } catch (error) {
        errorResponse(req, res, error);
    }
}

const putPublicacion = async (req, res) => {
    const {
        id,
        descripcion,
    } = req.body
    try {
        await PublicacionService.putPublicacion(descripcion, id);
        successResponse(req, res, "¡Post has been successfully updated!");
    } catch (error) {
        errorResponse(req, res, error);
    }
}

const deletePublicacion = async (req, res) => {
    const { publicacionId } = req.body;
    try {
        await PublicacionService.deletePublicacion(publicacionId);
        successResponse(req, res, "¡Post has been successfully deleted!");
    } catch (error) {
        errorResponse(req, res, error);
    }
}

module.exports = {
    getPublicaciones,
    getPublicacionesPorUsuario,
    postPublicacion,
    putPublicacion,
    deletePublicacion
}