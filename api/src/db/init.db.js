const { UserModel, User } = require("./models/userSchema");
const { PostSchema, Post } = require("./models/postSchema");
const { CommentSchema, Comment } = require("./models/commentSchema");
const { MessageModel, Message} = require("./models/messageSchema")
const { ConversationModel, Conversation} = require("./models/conversationSchema")

function setupModels(sequelize){
    User.init(UserModel, User.config(sequelize))
    Post.init(PostSchema, Post.config(sequelize))
    Comment.init(CommentSchema, Comment.config(sequelize))
    Message.init(MessageModel, Message.config(sequelize))
    Conversation.init(ConversationModel, Conversation.config(sequelize))
}

module.exports = setupModels;