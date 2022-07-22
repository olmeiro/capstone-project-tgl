const mongoose = require("../../mongoose/conexion");
const Schema = mongoose.Schema;

const PublicacionSchema = new Schema({
    usuarioId: { type: Number, required: false },
    descripcion: { type: String, maxlength: 100 },
    foto: { type: String, required: false },
    fecha: { type: String, required: false },
    likes: { type: Number },
    autorId:{type: mongoose.Types.ObjectId}
}, {
    timestamps: false,
    versionKey:false,
})

module.exports = mongoose.model("publicacion", PublicacionSchema);