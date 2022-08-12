const express = require("express");
const router = express.Router();


const userRouter = require("./userRouter");
const postsRouter = require("./postsRouter")
const commentsRouter = require("./commentsRouter");
const friendsRouter = require("./friendsRouter");
const favoritesRouter = require("./favoritesRouter");
const conversationsRouter = require("./conversationsRouter")
const messagesRouter = require("./messagesRouter")

router.use("/user", userRouter)
router.use("/posts", postsRouter)
router.use("/comments", commentsRouter)
router.use("/friends", friendsRouter)
router.use("/favorites", favoritesRouter)
router.use("/conversations", conversationsRouter)
router.use("/messages", messagesRouter)

module.exports = router