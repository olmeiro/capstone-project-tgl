const mongoose = require("../../mongoose/conexion");
const Schema = mongoose.Schema; // clase que permite generar la estructura de las tablas

const UsuarioSchema = new Schema({
    alias: { type: String, required: false, maxlength: 15, unique:true },
    nombre: { type: String, required: false, maxlength: 50 },
    email: { type: String, required: false, unique:true },
    telefono: { type: Number },
    contraseña: { type: String, required: false, maxlength: 15 },
    fotoDePerfil: { type: String },
    fotoDePortada: { type: String }
},{
    timestamps: false
})

module.exports = mongoose.model("usuario", UsuarioSchema); 