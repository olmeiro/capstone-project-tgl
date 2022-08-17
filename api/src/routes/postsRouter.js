const express = require("express");
const router = express.Router();
const upload = require("../multer/multerConfig");

const {
  deletePost,
  getPosts,
  getPostsByUser,
  putPost,
  uploadPost,
} = require("../controllers/postsController");

router.get("/all", getPosts);
router.get("/byuser/:userid", getPostsByUser);
router.post("/", upload.single("file"), uploadPost);
router.put("/", putPost);
router.delete("/:postId", deletePost);

module.exports = router;
