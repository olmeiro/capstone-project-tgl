const express = require("express");
const router = express.Router();

const commentsRouter = require("./commentsRouter");
const conversationsRouter = require("./conversationsRouter");
const favoritesRouter = require("./favoritesRouter");
const friendsRouter = require("./friendsRouter");
const messagesRouter = require("./messagesRouter");
const postsRouter = require("./postsRouter");
const userRouter = require("./userRouter");

router.use("/comments", commentsRouter);
router.use("/conversations", conversationsRouter);
router.use("/favorites", favoritesRouter);
router.use("/friends", friendsRouter);
router.use("/messages", messagesRouter);
router.use("/posts", postsRouter);
router.use("/user", userRouter);

module.exports = router;
