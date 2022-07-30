const { UserModel, User } = require("./models/userSchema");
const { PostSchema, Post } = require("./models/postSchema");
const { CommentSchema, Comment } = require("./models/commentSchema");

function setupModels(sequelize){
    User.init(UserModel, User.config(sequelize))
    Post.init(PostSchema, Post.config(sequelize))
    Comment.init(CommentSchema, Comment.config(sequelize))
}

module.exports = setupModels;