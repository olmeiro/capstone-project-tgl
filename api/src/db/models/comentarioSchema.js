const { Model, DataTypes } = require("sequelize");

const ComentarioSchema = {
    id: {
        allowNull: true,
        autoIncrement: true, // 
        primaryKey: true,   // 
        type: DataTypes.INTEGER
    },
    // publicacionId
    // usuarioId
    fecha: {
        allowNull: true,
        type: DataTypes.STRING
    },
    comentario: {
        allowNull: true,
        type: DataTypes.STRING
    },
}

class Comentario extends Model {
    static associate() { }

    static config(sequelize) {
        return {
            sequelize,
            tableName: 'comentarios',
            modelName: 'Comentario',
            timestamps: false
        }
    }
}

module.exports = {
    ComentarioSchema, Comentario
}