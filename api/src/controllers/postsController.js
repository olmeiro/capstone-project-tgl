const PostService = require("../services/postService");
const UserService = require("../services/userService");

const fs = require('fs');
const FormData = require('form-data');
const axios = require('axios')
const { API_KEY } = require("../config/index");
const { successResponse, errorResponse } = require("../utils/responses/index");

const getPosts = async (req, res) => {
    try {
        const posts = await PostService.getPostsAll();
        successResponse(req, res, posts);
    } catch (error) {
        errorResponse(req, res, error);
    }
}

const getPostsByUser = async (req, res) => {
    const { userid } = req.params;
    try {
        const posts = await PostService.getPostsByUser(userid);
        successResponse(req, res, posts);
    } catch (error) {
        errorResponse(req, res, error);
    }
}

const uploadPost = async (req, res) => {
    const { path }  = req.file;
    const {
        description,
        loginUserId
    } = req.body;

    try {
        const formData = new FormData();
        const foto64 = fs.readFileSync(path, { encoding: 'base64' });
        formData.append("image", foto64);

        const postToApi = await axios({
            method: 'post',
            url: `https://api.imgbb.com/1/upload?key=${API_KEY}`,
            headers: formData.getHeaders(),
            data: formData
        })
        const responseFromApi = postToApi.data
        const urlFoto = responseFromApi.data.url

        const post = await PostService.uploadPost({
            description,
            photo: urlFoto,
            date: new Date().toUTCString().split(",")[1].split("GMT")[0].trim()
        });
        const usuarioLogeado = await UserService.getUserById(loginUserId)
        await usuarioLogeado.addPost(post);
        successResponse(req, res, post);
    } catch (error) {
        console.log(error)
        errorResponse(req, res, error);
    }
}

const putPost = async (req, res) => {
    const {
        id,
        description,
        likes
    } = req.body
    try {
        await PostService.editPost(description, id, likes);
        successResponse(req, res, "¡Post has been successfully updated!");
    } catch (error) {
        errorResponse(req, res, error);
    }
}

const deletePost = async (req, res) => {
    const { postId } = req.params;
    try {
        await PostService.deletePost(postId);
        successResponse(req, res, "¡Post has been successfully deleted!");
    } catch (error) {
        console.log("errorrr", error)
        errorResponse(req, res, error);
    }
}

module.exports = {
    getPosts,
    getPostsByUser,
    uploadPost,
    putPost,
    deletePost
}