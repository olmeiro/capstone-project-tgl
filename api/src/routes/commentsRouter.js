const express = require("express");
const router = express.Router();

const  {
    getCommentsByPost,
    uploadPost,
    putComment,
    deleteComment
} = require("../controllers/commentsController");

router.get("/bypost", getCommentsByPost)
router.post("/", uploadPost)
router.put("/", putComment)
router.delete("/", deleteComment)


module.exports = router