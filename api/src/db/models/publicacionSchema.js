const { Model, DataTypes } = require("sequelize");

const PublicacionSchema = {
    id: {
        allowNull: true,
        autoIncrement: true, // 
        primaryKey: true,   // 
        type: DataTypes.INTEGER
    },
    descripcion: {
        allowNull: true,
        type: DataTypes.STRING
    },
    foto: {
        allowNull: true,
        type: DataTypes.STRING
    },
    fecha: {
        allowNull: true,
        type: DataTypes.STRING
    },
    likes: {
        allowNull: true,
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}

class Publicacion extends Model {
    static associate() { }

    static config(sequelize) {
        return {
            sequelize,
            tableName: 'publicaciones',
            modelName: 'Publicacion',
            timestamps: false
        }
    }
}

module.exports = {
    PublicacionSchema, Publicacion
}
