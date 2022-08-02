const { response } = require("express");
const FormData = require("form-data");
const axios = require("axios");
const fs = require("fs");

const { successResponse, errorResponse } = require("../utils/responses/index");
const { generateJWT } = require("../helpers/generate-jwts");
const UserService = require("../services/userService");
const { API_KEY } = require("../config/index");

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await UserService.getAllUsers();
    successResponse(req, res, allUsers);
  } catch (error) {
    errorResponse(req, res, error);
  }
};

const getUserByAlias = async (req, res) => {
  const { alias } = req.params;
  try {
    const user = await UserService.getUserByAlias(alias);
    successResponse(req, res, user);
  } catch (error) {
    errorResponse(req, res, error);
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserService.getUserById(id);
    successResponse(req, res, user);
  } catch (error) {
    errorResponse(req, res, error);
  }
};

const postUser = async (req, res) => {
  const { alias, name, email, phone, password } = req.body;
  try {
    const user = await UserService.postUser({
      alias,
      name,
      email,
      phone,
      password,
    });
    const token = await generateJWT(user.id, user.alias, user.name);
    successResponse(req, res, { user, token });
  } catch (error) {
    errorResponse(req, res, error);
  }
};

const putUserById = async (req, res) => {
  const photoProfile = req.file;
  const { id, alias, name, email, phone, password } = req.body;
  try {
    const formDataProfile = new FormData();
    const photo64PhotoProfile = fs.readFileSync(photoProfile.path, {
      encoding: "base64",
    });
    formDataProfile.append("image", photo64PhotoProfile);
    const postPhotoProfile = await axios({
      method: "post",
      url: `https://api.imgbb.com/1/upload?key=${API_KEY}`,
      headers: formDataProfile.getHeaders(),
      data: formDataProfile,
    });
    const response = postPhotoProfile.data
    const urlPhotoProfile = response.data.url
    await UserService.putUserById({
        alias,
        name,
        email,
        phone,
        password,
        photoProfile: urlPhotoProfile,
      },
      id
    );
    successResponse(req, res, "¡User has been updated successfully!");
  } catch (error) {
    errorResponse(req, res, error);
  } 
};

const deleteUserById = async (req, res) => {
  const { id } = req.body;
  try {
    await UserService.deleteUserById(id);
    successResponse(req, res, "¡User has been deleted successfully!");
  } catch (error) {
    errorResponse(req, res, error);
  }
};

const loginUser = async (req, res) => {
  const { alias, password } = req.body;
  try {
    const user = await UserService.login(alias, password);
    const token = await generateJWT(user.id, user.alias, user.name);
    successResponse(req, res, { user, token });
  } catch (error) {
    errorResponse(req, res, error);
  }
};

const renewToken = async (req, res = response) => {
  const { id, alias, name } = req;
  try {
    const token = await generateJWT(id, alias, name);
    successResponse(req, res, { ok: true, id, alias, name, token });
  } catch (error) {
    errorResponse(req, res, error);
  }
};

module.exports = {
  getAllUsers,
  getUserByAlias,
  getUserById,
  postUser,
  putUserById,
  deleteUserById,
  loginUser,
  renewToken,
};
