const { Sequelize } = require("sequelize");
const setupModels = require("./init.db");

const { User } = require("./models/userSchema");
const { Post } = require("./models/postSchema");
const { Comment } = require("./models/commentSchema");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } = require("../config/index");

const URI = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`

const sequelize = new Sequelize(URI, {
    dialect: 'postgres',
})

setupModels(sequelize);

//relaciones de uno a muchos
User.hasMany(Post);
Post.belongsTo(User);
User.hasMany(Comment);
Comment.belongsTo(User);
Post.hasMany(Comment);
Comment.belongsTo(Post);

sequelize.sync({
    force: true
})

module.exports = sequelize;