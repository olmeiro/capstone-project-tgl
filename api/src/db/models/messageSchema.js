const { Model, DataTypes } = require("sequelize");

const MessageModel = {
    id: {
        allowNull: true,
        autoIncrement: true, // 
        primaryKey: true,   // 
        type: DataTypes.INTEGER
    },
    text: {
        allowNull: true,
        type: DataTypes.STRING
    },
}

class Message extends Model {
    static associate() { }

    static config(sequelize) {
        return {
            sequelize,
            tableName: 'messages', 
            modelName: 'Message', 
            timestamps: true
        }
    }
}

module.exports = { 
    MessageModel, Message
}