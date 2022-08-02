const express = require("express");
const router = express.Router();

const {
    getFriendsByUserId,
    addFriend,
    deleteFriend
}= require("../controllers/friendsController");

router.get("/:userid", getFriendsByUserId)
router.post("/", addFriend)
router.delete("/", deleteFriend)

module.exports = router