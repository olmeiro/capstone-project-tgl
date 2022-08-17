const MessageService = require("../services/messageService");
const { successResponse, errorResponse } = require("../utils/responses/index");

const getMessagesByconversationId = async (req, res) => {
    const { conversationId } = req.params
    try {
        const messages = await MessageService.getMessagesByconversationId(conversationId)
        successResponse(req, res, messages)
    } catch (error) {
        errorResponse(req, res, error);
    }
}

const postOneMessage = async (req, res) => {
    const { text, userId, conversationId } = req.body
    try {
        const message = await MessageService.postOneMessage(text, userId, conversationId)
        successResponse(req, res, message)
    } catch (error) {
        errorResponse(req, res, error);
    }
}

const getOneParticularMessage = async (req, res) => {
    const { messageId } = req.params
    try {
        const oneMessage = await MessageService.getOneParticularMessage(messageId)
        successResponse(req, res, oneMessage)
    } catch (error) {
        errorResponse(req, res, error)
    }
}


module.exports = {
    getMessagesByconversationId,
    postOneMessage,
    getOneParticularMessage
}