const PublicacionService = require("../services/publicacionService")
const path = require("path");
const fs = require("fs-extra");
const publicacionService = new PublicacionService;

const getImagen = async (req, res) => {
    const { nombreImagen } = req.params
    const pathImagen = path.resolve(__dirname, `../multer/uploads/${nombreImagen}`)
    if (await fs.existsSync(pathImagen)) {
        res.sendFile(pathImagen);
    }
    else {
        res.status(400).send("NO IMAGEN")
    }

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
    // const { filename } = req.file
    // const { path } = req.file
    // console.log(req.file, filename)
    // const imagenUrl = `http://localhost:3000/publicacion/imagen/${filename}`
    const { descripcion, foto, fecha, likes } = req.body
    publicacionService.postPublicacion({ descripcion, foto, fecha, likes })
    res.send("Publicacion subida :)")
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
    getImagen
};




// app.post("/productoImagen", upload.single("file"), async (req, res) => {
//     // console.log(req.file)
//     // const { id,
//     //     nombre,
//     //     descripcion,
//     //     precioUnitario,
//     //     cantidad
//     // } = req.body;
//     const { path } = req.file;
//     // const producto = await Producto.create({
//     //     id,
//     //     nombre,
//     //     imagen: path,
//     //     descripcion,
//     //     precioUnitario,
//     //     cantidad
//     // })
//     // res.send(producto)
//     const producto = await Producto.create({
//         imagen: path
//     });
//     res.json(producto);
//     // console.log(req.body)
//     // res.send(req.body)
// })

// app.get("/", async (req, res) => {
//     const producto = await Producto.findByPk(1);
//     const dataValues = await producto.dataValues
//     console.log("accccccccccaaaaaaaa",dataValues);
//     res.json(dataValues)
// })