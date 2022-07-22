const axios = require("axios");
const postImagen = async (imagen) => {
    const imagenPosteada = await axios.post("https://api.imgbb.com/1/upload?key=32b788816a3666677b28fe86f73c91fb", imagen);
}
module.exports = { postImagen };
