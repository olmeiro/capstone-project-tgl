const jwt = require('jsonwebtoken')
// genera jwt 
const { SECRET_JWT_SEED } = require("../config/index");

const generateJWT = (id, nombre) => {

  return new Promise((resolve, reject) => {

    const payload = { id, nombre }

    jwt.sign(payload, SECRET_JWT_SEED, {
      expiresIn: '2h'
    }, (err, token) => {

      if(err) {
        console.log(err)
        reject('No se pudo generarl el token')
      }
      resolve(token)  
    })
  })
}

module.exports = {
  generateJWT
}