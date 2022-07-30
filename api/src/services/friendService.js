const boom = require("@hapi/boom");
const { models } = require("../db/sequelize");
const { User } = models;

class FriendService {
    constructor() {

    }
    static async getFriendsByUserId(id) {
        try {
            const user = await User.findByPk(id);
            let friends = user.friends;
            friends = friends.map(async id => await User.findByPk(id));
            friends = Promise.all(friends);
            return friends;
        } catch (error) {
            throw boom.internal(error.message);
        }
    }
    static async addFriend(friendId, id) {
        try {
            const user = await User.findByPk(id);
            const friends = [...user.friends, friendId];
            if (!user.friends.includes(friendId)) {
                await User.update({ friends }, { where: { id } })
            }
        } catch (error) {
            throw boom.internal(error.message);
        }
    }
    static async deleteFriend(friendId, id) {
        try {
            const user = await User.findByPk(id);
            const friends = user.friends.filter(friend => friend != friendId);
            await User.update({ friends }, { where: { id } });
        } catch (error) {
            throw boom.internal(error.message);
        }
    }

}

module.exports = FriendService;