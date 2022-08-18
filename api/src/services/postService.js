const boom = require("@hapi/boom");
const { models } = require("../db/sequelize");
const { Post } = models;

class PublicacionService {
  constructor() {}
  static async getPostsAll() {
    try {
      const allPosts = await Post.findAll();
      return allPosts;
    } catch (error) {
      throw boom.internal(error.message);
    }
  }
  static async getPostsByUser(UserId) {
    try {
      const postByUser = await Post.findAll({ where: { UserId } });
      return postByUser;
    } catch (error) {
      throw boom.internal(error.message);
    }
  }
  static async getPostById(postId) {
    try {
      const post = await Post.findByPk(postId);
      return post;
    } catch (error) {
      throw boom.internal(error.message);
    }
  }
  static async uploadPost(newPost) {
    try {
      const post = await Post.create(newPost);
      return post;
    } catch (error) {
      throw boom.internal(error.message);
    }
  }
  static async editPost(description, id, likes) {
    try {
      await Post.update({ description, likes }, { where: { id } });
    } catch (error) {
      throw boom.internal(error.message);
    }
  }
  static async deletePost(id) {
    try {
      await Post.destroy({ where: { id } });
    } catch (error) {
      throw boom.internal(error.message);
    }
  }
}

module.exports = PublicacionService;
