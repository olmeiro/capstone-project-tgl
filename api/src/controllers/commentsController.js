const CommentService = require("../services/commentService");
const PostService = require("../services/postService");
const UserService = require("../services/userService");

const { successResponse, errorResponse } = require("../utils/responses/index");

const getCommentsByPost = async (req, res) => {
    try {
        const { postid } = req.params;
        const comments = await CommentService.getCommentsByPost(postid);
        successResponse(req, res, comments);
    } catch (error) {
        errorResponse(req, res, error);
    }
}

const uploadComment = async (req, res) => {
    const {
        comment,
        userId,
        postId
    } = req.body;
    try {
        let date = new Date();
        date.setUTCHours(-3);
        date = date.toUTCString().split(",")[1].split("GMT")[0].trim();
        const createdComment = await CommentService.uploadComment({
            comment,
            date
        })
        const usuarioLogeado = await UserService.getUserById(userId);
        const publicacion = await PostService.getPostById(postId);
        await usuarioLogeado.addComment(createdComment);
        await publicacion.addComment(createdComment);
        successResponse(req, res, createdComment);
    } catch (error) {
        errorResponse(req, res, error);
    }
}

const putComment = async (req, res) => {
    const { newComment, commentId } = req.body;
    try {
        await CommentService.putComment(newComment, commentId);
        successResponse(req, res,"¡Comment has been successfully updated!");
    } catch (error) {
        errorResponse(req, res, error);
    }
}

const deleteComment = async (req, res) => {
    const { commentId } = req.params;
    try {
        await CommentService.deleteComment(commentId);
        successResponse(req, res,"¡Comment has been successfully deleted!");
    } catch (error) {
        errorResponse(req, res, error);
    }
}

module.exports = {
    getCommentsByPost,
    uploadComment,
    putComment,
    deleteComment
}