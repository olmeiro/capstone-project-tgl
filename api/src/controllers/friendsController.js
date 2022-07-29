const FriendService = require("../services/friendService");
const { successResponse, errorResponse } = require("../utils/responses/index");

const getFriendsByUserId = async (req, res) => {
    const { userId } = req.body;
    try {
        const friends = await FriendService.getFriendsByUserId(userId);
        successResponse(req, res, friends);
    } catch (error) {
        errorResponse(req, res, error);
    }
}

const addFriend = async (req, res) => {
    const { friendId, userId } = req.body;
    try {
        await FriendService.addFriend(friendId, userId);
        successResponse(req, res, "¡Friend has been successfully added!");
    } catch (error) {
        errorResponse(req, res, error);
    }
}

const deleteFriend = async (req, res) => {
    const { friendId, userId } = req.body;
    try {
        await FriendService.deleteFriend(friendId, userId);
        successResponse(req, res, "¡Friend has been successfully deleted!");
    } catch (error) {
        errorResponse(req, res, error);
    }
}

module.exports = {
    getFriendsByUserId,
    addFriend,
    deleteFriend
}