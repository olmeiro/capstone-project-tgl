const express = require("express");
const router = express.Router();

const {
  getFavoritesByUserId,
  addFavorite,
  deleteFavorite,
} = require("../controllers/favoritesController");

router.get("/:userId", getFavoritesByUserId);
router.post("/", addFavorite);
router.delete("/", deleteFavorite);

module.exports = router;
