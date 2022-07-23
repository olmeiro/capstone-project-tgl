const PublicacionService = require("../services/publicacionService")
const path = require("path");
const fs = require("fs-extra");
const publicacionService = new PublicacionService;
const axios = require("axios");



const getImagen = async (req, res) => {
    // const { nombreImagen } = req.params
    // const pathImagen = path.resolve(__dirname, `../multer/uploads/${nombreImagen}`)
    // if (await fs.existsSync(pathImagen)) {
    //     res.sendFile(pathImagen);
    // }
    // else {
    //     res.status(400).send("NO IMAGEN")
    // }
    res.json("holaaaaaaaaaaaaaaaaa")
}
const getPublicacions = (req, res) => {
    // const publicacions = await publicacionService.metodoquefreddyesblesca

    res.json("d")
}

const getPublicacionPorId = async (req, res) => {
    const { id } = req.params;
    const publicacion = await publicacionService.getPublicacionPorId(id);
    res.json(publicacion)
    // const { nombreImagen } = req.query;
    // const imagenUrl = `http://localhost:3000/publicacion/imagen/${nombreImagen}`
    // res.send(imagenUrl)
}


const postPublicacion = async (req, res) => {
    // const imagenUrl = `http://localhost:3000/publicacion/imagen/${filename}`
    const { descripcion, foto, fecha, likes } = req.body
    publicacionService.postPublicacion({ descripcion, foto, fecha, likes })
    res.send("Publicacion subida :)")
}

const postImagen = async (req, res) =>{
    // aca posteamos la imagen en la api de imagenes
    // const { filename } = req.file
    // const { path } = req.file
    const path = require("path");
    const imagePath = path.join(__dirname, "../../imagenesxd/imagennueva.jpg");
    // console.log(req.file)
    // await axios.post(`www.urldelaapi/${filename}`, );
    let buff = Buffer.from(req.body.imagenEnviada, "base64")
    fs.writeFileSync(imagePath, buff);
    console.log("EL body=>>", req.body)
    // console.log(" FILE  =>>",req.file)
    res.send("imagen recibida");
}

const putPublicacion = async (req, res) => {


}

const deletePublicacion = async (req, res) => {


}

module.exports = {
    getPublicacions,
    getPublicacionPorId,
    postPublicacion,
    putPublicacion,
    deletePublicacion,
    getImagen,
    postImagen
};