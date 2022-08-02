const { Model, DataTypes } = require("sequelize");

const PostSchema = {
    id: {
        allowNull: true,
        autoIncrement: true, // 
        primaryKey: true,   // 
        type: DataTypes.INTEGER
    },
    description: {
        allowNull: true,
        type: DataTypes.STRING
    },
    photo: {
        allowNull: true,
        type: DataTypes.STRING
    },
    date: {
        allowNull: true,
        type: DataTypes.STRING
    },
    likes: {
        allowNull: true,
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}

class Post extends Model {
    static associate() { }

    static config(sequelize) {
        return {
            sequelize,
            tableName: 'posts',
            modelName: 'Post',
            timestamps: false
        }
    }
}

module.exports = {
    PostSchema, Post
}
