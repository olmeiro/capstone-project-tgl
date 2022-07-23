const mongoose = require("../../mongoose/conexion");
const Schema = mongoose.Schema;

const ComentarioSchema = new Schema({
    publicacionId: { type: Number, required: true },
    userId: { type: Number, required: true},
    fecha: { type: String, required: true },
    comentario: { type: String, required: true },
    autorId:{type: mongoose.Types.ObjectId}
}, {
    timestamps: false
})

module.exports = mongoose.model("comentario", ComentarioSchema); 