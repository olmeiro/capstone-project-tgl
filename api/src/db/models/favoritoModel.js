const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoritoSchema = new Schema({
    usuarioId: { type: Number, required: true },
    descripcion: { type: String, maxlength: 100 },
    foto: { type: String, required: true },
    fecha: { type: String, required: true },
    likes: { type: Number },
}, {
    timestamps: false
})

module.exports = mongoose.model("favorito", favoritoSchema);