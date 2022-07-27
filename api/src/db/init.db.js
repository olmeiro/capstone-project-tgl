const { UsuarioModel, Usuario } = require("./models/usuarioSchema");
const { PublicacionSchema, Publicacion } = require("./models/publicacionSchema");
const { ComentarioSchema, Comentario } = require("./models/comentarioSchema");


function setupModels(sequelize){
    Usuario.init(UsuarioModel, Usuario.config(sequelize))
    Publicacion.init(PublicacionSchema, Publicacion.config(sequelize))
    Comentario.init(ComentarioSchema, Comentario.config(sequelize))
}

module.exports = setupModels;