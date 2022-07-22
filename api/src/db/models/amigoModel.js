const mongoose = require("../../mongoose/conexion");
const Schema = mongoose.Schema; 

const AmigoSchema = new Schema({
    alias: { type: String, required: true, maxlength: 15 },
    nombre: { type: String, required: true, maxlength: 50 },
    email: { type: String, required: true },
    telefono: { type: Number },
    contraseña: { type: String, required: true, maxlength: 15 },
    fotoDePerfil: { type: String },
    fotoDePortada: { type: String }
},{
    timestamps: false
})

module.exports = mongoose.model("amigo", AmigoSchema); 