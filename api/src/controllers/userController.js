const { response } = require("express");
const FormData = require("form-data");
const axios = require("axios");
const fs = require("fs");
const jwt = require('jsonwebtoken')


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
  const { id } = req.body;
  console.log("ID GETUSERBYID", id)
  // try {
  //   const user = await UserService.getUserById(id);
  //   successResponse(req, res, user);
  // } catch (error) {
  //   errorResponse(req, res, error);
  // }
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
  const [photoProfile, photoCover] = req.files;
  const { id, alias, name, email, phone, password } = req.body;
  try {
    const formDataProfile = new FormData();
    const formDataCover = new FormData();
    const photo64PhotoProfile = fs.readFileSync(photoProfile.path, {
      encoding: "base64",
    });
    const photo64PhotoCover = fs.readFileSync(photoCover.path, {
      encoding: "base64",
    });

    formDataProfile.append("image", photo64PhotoProfile);
    formDataCover.append("image", photo64PhotoCover);

    const postPhotoProfile = axios({
      method: "post",
      url: `https://api.imgbb.com/1/upload?key=${API_KEY}`,
      headers: formDataProfile.getHeaders(),
      data: formDataProfile,
    });
    const postPhotoCover = axios({
      method: "post",
      url: `https://api.imgbb.com/1/upload?key=${API_KEY}`,
      headers: formDataCover.getHeaders(),
      data: formDataCover,
    });

    const arrayPromise = [postPhotoProfile, postPhotoCover];
    const responseFromApi = await Promise.all(arrayPromise);
    const dataFromApi = responseFromApi.map((res) => res.data);
    const urls = dataFromApi.map((data) => data.data.url);
    const [urlPhotoProfile, urlPhotoCover] = urls;

    await UserService.putUserById(
      {
        alias,
        name,
        email,
        phone,
        password,
        photoProfile: urlPhotoProfile,
        photoCover: urlPhotoCover,
      },
      id
    );
    successResponse(req, res, "¡User has been updated successfully!");
  } catch (error) {
    errorResponse(req, res, error);
  }
};
const putProfilePhotoUser = async (req, res) => {
  const {  SECRET_JWT_SEED } = require("../config/index")

  const token = req.headers['x-token']

  const { id } = jwt.verify(token, SECRET_JWT_SEED)
  const idUser = id

  const photoProfile = req.file;

  try {
    const formDataProfile = new FormData();

    const photo64PhotoProfile = fs.readFileSync(photoProfile.path, {
      encoding: "base64",
    });

    formDataProfile.append("image", photo64PhotoProfile);

    const postPhotoProfile = axios({
      method: "post",
      url: `https://api.imgbb.com/1/upload?key=${API_KEY}`,
      headers: formDataProfile.getHeaders(),
      data: formDataProfile,
    });

    const arrayPromise = [postPhotoProfile];
    const responseFromApi = await Promise.all(arrayPromise);
    const dataFromApi = responseFromApi.map((res) => res.data);
    const urls = dataFromApi.map((data) => data.data.url);
    const [urlPhotoProfile] = urls;

    console.log("dataController:", {idUser, urlPhotoProfile})

    await UserService.putUserById(
      {
        photoProfile: urlPhotoProfile
      },
      idUser
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
  putProfilePhotoUser,
  deleteUserById,
  loginUser,
  renewToken,
};
