const { Sequelize } = require("sequelize");
const setupModels = require("./init.db");

const { User } = require("./models/userSchema");
const { Post } = require("./models/postSchema");
const { Comment } = require("./models/commentSchema");
const { Message } = require("./models/messageSchema");
const { Conversation } = require("./models/conversationSchema");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } = require("../config/index");

const URI = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`

const sequelize = new Sequelize(
    URI,
    {
        dialect: 'postgres',
        // pool: {
        //     max: 3,
        //     min: 1,
        //     idle: 10000,
        // },
        // dialectOptions: {
        //     ssl: {
        //         require: true,
        //         ///
        //         rejectUnauthorized: false,
        //     },
        //     keepAlive: true,
        // },
        // ssl: true
    })

setupModels(sequelize);

//relaciones de uno a muchos
User.hasMany(Post);
Post.belongsTo(User);
User.hasMany(Comment);
Comment.belongsTo(User);
Post.hasMany(Comment);
Comment.belongsTo(Post);
User.hasMany(Message);
Message.belongsTo(User);
Conversation.hasMany(Message);
Message.belongsTo(Conversation);

sequelize.sync({
    force: false,
    alter: true
})

module.exports = sequelize;