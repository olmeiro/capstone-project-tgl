const express = require("express");
const router = express.Router();

const {
    getMessagesByconversationId,
    postOneMessage,
    getOneParticularMessage
} = require("../controllers/messagesController");

router.get("/particularone/:messageId", getOneParticularMessage)
router.get("/:conversationId", getMessagesByconversationId);
router.post("/", postOneMessage)

module.exports = router