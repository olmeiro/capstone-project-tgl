const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const comentarioSchema = new Schema({
    publicacionId: { type: Number, required: true },
    userId: { type: Number, required: true},
    fecha: { type: String, required: true },
    comentario: { type: String, required: true },
}, {
    timestamps: false
})

module.exports = mongoose.model("comentario", comentarioSchema); 