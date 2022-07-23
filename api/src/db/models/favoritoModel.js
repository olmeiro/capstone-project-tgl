const mongoose = require("../../mongoose/conexion");
const Schema = mongoose.Schema;

const FavoritoSchema = new Schema({
    usuarioId: { type: Number, required: true },
    descripcion: { type: String, maxlength: 100 },
    foto: { type: String, required: true },
    fecha: { type: String, required: true },
    likes: { type: Number },
    autorId:{type: mongoose.Types.ObjectId}
}, {
    timestamps: false
})

module.exports = mongoose.model("favorito", FavoritoSchema);