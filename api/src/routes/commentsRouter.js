const express = require("express");
const router = express.Router();

const  {
    getCommentsByPost,
    uploadComment,
    putComment,
    deleteComment
} = require("../controllers/commentsController");

router.get("/bypost/:postid", getCommentsByPost)
router.post("/", uploadComment)
router.put("/", putComment)
router.delete("/:commentId", deleteComment)


module.exports = router