const { Model, DataTypes } = require("sequelize");

const UserModel = {
    id: {
        allowNull: true,
        autoIncrement: true, // 
        primaryKey: true,   // 
        type: DataTypes.INTEGER
    },
    alias: {
        allowNull: true,
        unique: true,
        type: DataTypes.STRING
    },
    name: {
        allowNull: true,
        type: DataTypes.STRING
    },
    bio: {
        allowNull: true,
        type: DataTypes.STRING
    },
    status: {
        allowNull: true,
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    email:{
        allowNull: true,
        type: DataTypes.STRING
    },
    phone:{
        allowNull: true,
        type: DataTypes.BIGINT
    },
    password:{
        allowNull: true,
        type: DataTypes.STRING
    },
    photoProfile:{
        allowNull: true,
        type: DataTypes.STRING
    },
    photoCover:{
        allowNull: true,
        type: DataTypes.STRING
    },
    friends:{
        allowNull :true,
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        defaultValue:[]
    },
    favorites:{
        allowNull :true,
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        defaultValue:[]
    }
}

class User extends Model {
    static associate() { }

    static config(sequelize) {
        return {
            sequelize,
            tableName: 'users', 
            modelName: 'User', 
            timestamps: true
        }
    }
}

module.exports = { 
    UserModel, User
}