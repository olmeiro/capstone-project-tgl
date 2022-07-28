const { response } = require('express')
const jwt = require('jsonwebtoken')

const {  SECRET_JWT_SEED } = require("../config/index")

const validarJWT = (req, res= response, next) => {
  const token = req.header('x-token')

  // validacion token
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No hay token en la peticion'
    })
  }

  try {
    const { id, nombre } = jwt.verify(token, SECRET_JWT_SEED)

    req.id = id
    req.nombre = nombre

  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Token no válido'
    })
  }
  next()
}

module.exports = { validarJWT }