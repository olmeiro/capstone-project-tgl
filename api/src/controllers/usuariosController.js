const { response } = require("express");
const { generateJWT } = require("../helpers/generate-jwts");
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
        errorResponse(req, res, error);
    }
}

const getUsuariosPorAlias = async (req, res) => {
    const { alias } = req.params;
    try {
        const usuario = await UsuarioService.getUsuariosPorAlias(alias);
        successResponse(req, res, usuario);
    } catch (error) {
        errorResponse(req, res, error)
    }
}

const getUsuarioPorId = async (req, res) => {
    const { id } = req.body;
    try {
        const usuario = await UsuarioService.getUsuarioPorId(id)
        successResponse(req, res, usuario);
    } catch (error) {
        errorResponse(req, res, error);
    }
}

const postUsuario = async (req, res) => {
    const {
        alias,
        nombre,
        email,
        telefono,
        contraseña
    } = req.body;
    try {
        const usuario = await UsuarioService.postUsuario({
            alias,
            nombre,
            email,
            telefono,
            contraseña
        });
        successResponse(req, res, usuario);
    } catch (error) {
        errorResponse(req, res, error);
    }
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
    try {

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
        successResponse(req, res, "¡User has been updated successfully!");
    } catch (error) {
        console.log(error)
        errorResponse(req, res, error);
    }
}

const deleteUsuarioPorId = async (req, res) => {
    const { id } = req.body;
    try {
        await UsuarioService.deleteUsuarioPorId(id);
        successResponse(req, res, "¡User has been deleted successfully!");
    } catch (error) {
        errorResponse(req, res, error);
    }
}

const loginUsuario = async (req, res) => {
    const { alias, contraseña } = req.body
    try {
        const user = await UsuarioService.login(alias, contraseña)
        // generar JWT
        const token = await generateJWT(user.id, user.alias)
        successResponse(req, res, { user, token });
    } catch (error) {
        errorResponse(req, res, error);
    }
}

const revalidarToken = async (req, res = response) => {
    const { id, nombre } = req
    try {
        // Generar JWT
        const token = await generateJWT(id, nombre)
        successResponse(req, res, { ok: true, id, nombre, token });
    } catch (error) {
        errorResponse(req, res, error);
    }
}

module.exports = {
    getUsuariosTodos,
    getUsuariosPorAlias,
    getUsuarioPorId,
    postUsuario,
    putUsuarioPorId,
    deleteUsuarioPorId,
    loginUsuario,
    revalidarToken
}