const UsuarioService = require("../services/usuarioService");

const getUsuariosTodos = async (req, res) => {
    const usuariosTodos = await UsuarioService.getUsuariosTodos();
    res.json(usuariosTodos);
}

const getUsuariosPorAlias = async (req, res) => {
    const { alias } = req.params;
    const usuario = await UsuarioService.getUsuariosPorAlias({
        where: { alias }
    });
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
    }, { where: { id } });

    res.json("¡el usuario ha sido actualizado exitosamente!");
}

const deleteUsuarioPorId = async (req, res) => {
    const { id } = req.body;
    await UsuarioService.deleteUsuarioPorId({
        where: {
            id
        }
    });
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