const mongoose = require("mongoose");
const Schema = mongoose.Schema; // clase que permite generar la estructura de las tablas

const usuarioSchema = new Schema({
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

module.exports = mongoose.model("usuario", usuarioSchema); 