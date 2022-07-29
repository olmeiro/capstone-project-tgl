const { UserModel, User } = require("./models/userSchema");
const { PublicacionSchema, Publicacion } = require("./models/publicacionSchema");
const { ComentarioSchema, Comentario } = require("./models/comentarioSchema");

function setupModels(sequelize){
    User.init(UserModel, User.config(sequelize))
    Publicacion.init(PublicacionSchema, Publicacion.config(sequelize))
    Comentario.init(ComentarioSchema, Comentario.config(sequelize))
}

module.exports = setupModels;