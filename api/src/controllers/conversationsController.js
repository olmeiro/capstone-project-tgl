const ConversationService = require("../services/conversationService");
const { successResponse, errorResponse } = require("../utils/responses/index");

const getConversationsByUserId = async (req, res) => {
    const { userId } = req.params
    try {
        const conversations = await ConversationService.getConversationsByUserId(userId)
        successResponse(req, res, conversations);
    } catch (error) {
        errorResponse(req, res, error);
    }
}

const postConversation = async (req, res) => {
    const { senderId, receiverId } = req.body
    const members = [senderId, receiverId]
    try {
        const conversation = await ConversationService.postConversation(members);
        successResponse(req, res, conversation)
    } catch (error) {
        errorResponse(req, res, error);
    }
}


module.exports = {
    getConversationsByUserId,
    postConversation
}