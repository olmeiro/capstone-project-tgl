const FavoritoService = require("../services/favoritoService");

const getFavoritos = async (req, res)=>{
    const { usuarioId } = req.body;
    const favoritos = await FavoritoService.getFavoritosPorUsuarioId(usuarioId);
    res.json(favoritos);
}

const agregarFavorito = async (req, res)=>{
    const { publicacionId, usuarioId } = req.body;
    await FavoritoService.agregarFavorito(publicacionId, usuarioId);
    res.json("favorito agregado correctamente");
}

const deleteFavoritos = async (req, res)=>{
    const { publicacionId, usuarioId } = req.body;
    await FavoritoService.deleteFavorito(publicacionId, usuarioId);
    res.json("favorito eliminado correctamente");
}

module.exports = {
    getFavoritos, 
    agregarFavorito,
    deleteFavoritos
}