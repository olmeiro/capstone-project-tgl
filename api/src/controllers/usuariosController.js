const { response } = require("express");
const { generateJWT } = require("../helpers/generate-jwts");
const UsuarioService = require("../services/usuarioService");

const getUsuariosTodos = async (req, res) => {
    const usuariosTodos = await UsuarioService.getUsuariosTodos();
    res.json(usuariosTodos);
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
        contraseña,
        fotoDePerfil,
        fotoDePortada
    } = req.body;

    const usuario = await UsuarioService.postUsuario({
        alias,
        nombre,
        email,
        telefono,
        contraseña,
        fotoDePerfil,
        fotoDePortada
    });

    res.json(usuario);
}

const putUsuarioPorId = async (req, res) => {
    const {
        id,
        alias,
        nombre,
        email,
        telefono,
        contraseña,
        fotoDePerfil,
        fotoDePortada
    } = req.body;

    await UsuarioService.putUsuarioPorId({
        alias,
        nombre,
        email,
        telefono,
        contraseña,
        fotoDePerfil,
        fotoDePortada
    }, id);

    res.json("¡el usuario ha sido actualizado exitosamente!");
}

const deleteUsuarioPorId = async (req, res) => {
    const { id } = req.body;
    await UsuarioService.deleteUsuarioPorId(id);
    res.json("¡el usuario ha sido eliminado exitosamente!");
}

const loginUsuario = async (req, res) => {
    const { alias, contraseña } = req.body
    try {
        const user = await UsuarioService.login(alias, contraseña)

        // generar JWT
        const token = await generateJWT(user.id, user.alias)

        res.status(200).json({
            user,
            token
        })
    } catch (error) {
        console.log(error)
    }
}

const revalidarToken = async (req, res= response) => {
    const { id, nombre } = req
    console.log("id-nombre", nombre)

    // Generar JWT
    const token = await generateJWT(id, nombre)

    res.json({
        ok: true,
        id,
        nombre,
        token
    })
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