const { Model, DataTypes } = require("sequelize");

const ConversationModel = {
    id: {
        allowNull: true,
        autoIncrement: true, // 
        primaryKey: true,   // 
        type: DataTypes.INTEGER
    },
    members: {
        allowNull: true,
        type: DataTypes.ARRAY(DataTypes.INTEGER)
    }
}

class Conversation extends Model {
    static associate() { }

    static config(sequelize) {
        return {
            sequelize,
            tableName: 'conversations', 
            modelName: 'Conversation', 
            timestamps: true
        }
    }
}

module.exports = { 
    ConversationModel, Conversation
}