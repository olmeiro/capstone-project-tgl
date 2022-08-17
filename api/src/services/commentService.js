const boom = require("@hapi/boom");
const { models } = require("../db/sequelize");
const { Comment } = models;

class CommentService {
  constructor() {}
  static async getCommentsByPost(postId) {
    try {
      const comments = await Comment.findAll();
      const filteredComments = comments.filter(
        (Comment) => Comment.PostId == postId
      );
      return filteredComments;
    } catch (error) {
      throw boom.internal(error.message);
    }
  }
  static async uploadComment(comment) {
    try {
      const createdComment = await Comment.create(comment);
      return createdComment;
    } catch (error) {
      throw boom.internal(error.message);
    }
  }
  static async putComment(comment, id) {
    try {
      await Comment.update({ comment }, { where: { id } });
    } catch (error) {
      throw boom.internal(error.message);
    }
  }
  static async deleteComment(id) {
    try {
      await Comment.destroy({ where: { id } });
    } catch (error) {
      throw boom.internal(error.message);
    }
  }
}

module.exports = CommentService;
