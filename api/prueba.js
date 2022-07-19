const mongoose = require("mongoose");
const Usuario = require("./src/db/models/usuarioModel")


(async ()=>{
  await mongoose.connect("mongodb://127.0.0.1/pruebaDB");

  const newUsuario = await Usuario.create({
    alias: "beto123",
    nombre: "Alberto",
    email: "eeee@hotmail.com",
    telefono: 4545454,
    contraseña: "contraseña",
    fotoDePerfil: "fotoperfil",
    fotoDePortada: "fotoportada"
  })

  console.log(newUsuario);
})();
