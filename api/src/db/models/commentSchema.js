const { Model, DataTypes } = require("sequelize");

const CommentSchema = {
    id: {
        allowNull: true,
        autoIncrement: true, // 
        primaryKey: true,   // 
        type: DataTypes.INTEGER
    },
    date: {
        allowNull: true,
        type: DataTypes.STRING
    },
    comment: {
        allowNull: true,
        type: DataTypes.STRING
    },
}

class Comment extends Model {
    static associate() { }

    static config(sequelize) {
        return {
            sequelize,
            tableName: 'comments',
            modelName: 'Comment',
            timestamps: false
        }
    }
}

module.exports = {
    CommentSchema, Comment
}