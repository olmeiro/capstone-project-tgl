const { Sequelize } = require("sequelize");
const setupModels = require("./init.db");

const { User } = require("./models/userSchema");
const { Publicacion } = require("./models/publicacionSchema");
const { Comentario } = require("./models/comentarioSchema");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } = require("../config/index");

const URI = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`

const sequelize = new Sequelize(URI, {
    dialect: 'postgres',
})

setupModels(sequelize);

//relaciones de uno a muchos
User.hasMany(Publicacion);
Publicacion.belongsTo(User);
User.hasMany(Comentario);
Comentario.belongsTo(User);
Publicacion.hasMany(Comentario);
Comentario.belongsTo(Publicacion);

sequelize.sync({
    force: false
})

module.exports = sequelize;