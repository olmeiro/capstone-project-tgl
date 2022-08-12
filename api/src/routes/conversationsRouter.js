const express = require("express");
const router = express.Router();

const {
    getConversationsByUserId,
    postConversation
} = require("../controllers/conversationsController");


router.get("/:userId", getConversationsByUserId);
router.post("/", postConversation)

module.exports = router