const boom = require("@hapi/boom");
const { models } = require("../db/sequelize");
const { Message, User, Conversation } = models;

class MessageService {
    constructor() {

    }
    static async getMessagesByconversationId(ConversationId) {
        try {
            const messages = await Message.findAll({
                where:{
                    ConversationId 
                }
            })
            return messages;
        } catch (error) {
            throw boom.internal(error.message);
        }
    }
    static async postOneMessage(text, userId, conversationId) {
        try {
            const message = await Message.create({ text });
            const senderUser = await User.findByPk(userId);
            const conversation = await Conversation.findByPk(conversationId);

            senderUser.addMessages(message)
            conversation.addMessages(message)
            return message;
        } catch (error) {
            throw boom.internal(error.message);
        }
    }
}

module.exports = MessageService;