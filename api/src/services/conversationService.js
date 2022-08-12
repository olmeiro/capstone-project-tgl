const boom = require("@hapi/boom");
const { models } = require("../db/sequelize");
const { Conversation } = models;

class ConversationService {
    constructor() {

    }
    static async getConversationsByUserId(userId) {
        const conversationsAll = await Conversation.findAll();
        const conversationsByUserId = conversationsAll.filter(conversation => {
            return conversation.members.find(id => id == userId)
        })
        return conversationsByUserId;
    }
    static async postConversation(members) {
        const conversation = await Conversation.create({ members });
        return conversation
    }
}

module.exports = ConversationService;