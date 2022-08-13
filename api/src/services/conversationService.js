const boom = require("@hapi/boom");
const { models } = require("../db/sequelize");
const { Conversation } = models;

class ConversationService {
    constructor() {

    }
    static async getConversationsByUserId(userId) {
        try {
            const conversationsAll = await Conversation.findAll();
            const conversationsByUserId = conversationsAll.filter(conversation => {
                return conversation.members.find(id => id == userId)
            })
            return conversationsByUserId;
        } catch (error) {
            throw boom.internal(error.message);
        }
    }
    static async postConversation(members) {
        try {
            const conversation = await Conversation.create({ members });
            return conversation
        } catch (error) {
            throw boom.internal(error.message);
        }
    }
}

module.exports = ConversationService;