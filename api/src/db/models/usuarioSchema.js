const { Model, DataTypes } = require("sequelize");

const UsuarioModel = {
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
    nombre: {
        allowNull: true,
        type: DataTypes.STRING
    },
    email:{
        allowNull: true,
        type: DataTypes.STRING
    },
    telefono:{
        allowNull: true,
        type: DataTypes.INTEGER
    },
    contraseña:{
        allowNull: true,
        type: DataTypes.STRING
    },
    fotoDePerfil:{
        allowNull: true,
        type: DataTypes.STRING
    },
    fotoDePortada:{
        allowNull: true,
        type: DataTypes.STRING
    },
    amigos:{
        allowNull :true,
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        defaultValue:[]
    },
    favoritos:{
        allowNull :true,
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        defaultValue:[]
    }
}

class Usuario extends Model {
    static associate() { }

    static config(sequelize) {
        return {
            sequelize,
            tableName: 'usuarios', 
            modelName: 'Usuario', 
            timestamps: false
        }
    }
}

module.exports = { 
    UsuarioModel, Usuario
}