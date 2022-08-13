const express = require("express");
const router = express.Router();

const {
    getMessagesByconversationId,
    postOneMessage,
} = require("../controllers/messagesController");


router.get("/:conversationId", getMessagesByconversationId);
router.post("/", postOneMessage)

module.exports = router