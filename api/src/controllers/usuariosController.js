const UsuarioService = require("../services/usuarioService");

const fs = require('fs');
const FormData = require('form-data');
const axios = require('axios')
const { API_KEY } = require("../config/index");

const { successResponse, errorResponse } = require("../responses/index");

const getUsuariosTodos = async (req, res) => {
    try {
        const usuariosTodos = await UsuarioService.getUsuariosTodos();
        successResponse(req, res, usuariosTodos);
    } catch (error) {
        errorResponse(req, res, error.message);      
    }
}

const getUsuariosPorAlias = async (req, res) => {
    const { alias } = req.params;
    const usuario = await UsuarioService.getUsuariosPorAlias(alias);
    res.json(usuario);
}

const getUsuarioPorId = async (req, res) => {
    const { id } = req.body;
    const usuario = await UsuarioService.getUsuarioPorId(id)
    res.json(usuario);
}

const postUsuario = async (req, res) => {
    const {
        alias,
        nombre,
        email,
        telefono,
        contraseña
    } = req.body;

    const usuario = await UsuarioService.postUsuario({
        alias,
        nombre,
        email,
        telefono,
        contraseña
    });

    res.json(usuario);
}

const putUsuarioPorId = async (req, res) => {
    const [fotoDePerfil, fotoDePortada] = req.files;
    const {
        id,
        alias,
        nombre,
        email,
        telefono,
        contraseña,
    } = req.body;

    const formDataPerfil = new FormData();
    const formDataPortada = new FormData();
    const foto64FotoDePerfil = fs.readFileSync(fotoDePerfil.path, { encoding: "base64" });
    const foto64FotoDePortada = fs.readFileSync(fotoDePortada.path, { encoding: "base64" });

    formDataPerfil.append("image", foto64FotoDePerfil);
    formDataPortada.append("image", foto64FotoDePortada);

    const postDeFotoPerfil = axios({
        method: 'post',
        url: `https://api.imgbb.com/1/upload?key=${API_KEY}`,
        headers: formDataPerfil.getHeaders(),
        data: formDataPerfil
    })
    const postDeFotoPortada = axios({
        method: 'post',
        url: `https://api.imgbb.com/1/upload?key=${API_KEY}`,
        headers: formDataPortada.getHeaders(),
        data: formDataPortada
    })

    const arrayPromise = [postDeFotoPerfil, postDeFotoPortada];
    const responseFromApi = await Promise.all(arrayPromise);
    const dataFromApi = responseFromApi.map(res => res.data);
    const urls = dataFromApi.map(data => data.data.url);
    const [urlFotoDePerfil, urlFotoDePortada] = urls;

    await UsuarioService.putUsuarioPorId({
        alias,
        nombre,
        email,
        telefono,
        contraseña,
        fotoDePerfil: urlFotoDePerfil,
        fotoDePortada: urlFotoDePortada
    }, id);

    res.json("¡el usuario ha sido actualizado exitosamente!");
}

const deleteUsuarioPorId = async (req, res) => {
    const { id } = req.body;
    await UsuarioService.deleteUsuarioPorId(id);
    res.json("¡el usuario ha sido eliminado exitosamente!");
}

module.exports = {
    getUsuariosTodos,
    getUsuariosPorAlias,
    getUsuarioPorId,
    postUsuario,
    putUsuarioPorId,
    deleteUsuarioPorId
}