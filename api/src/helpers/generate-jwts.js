const jwt = require("jsonwebtoken");

const { SECRET_JWT_SEED } = require("../config/index");

const generateJWT = (id, alias, name) => {
  return new Promise((resolve, reject) => {
    const payload = { id, alias, name };

    jwt.sign(
      payload,
      SECRET_JWT_SEED,
      {
        expiresIn: "2h",
      },
      (err, token) => {
        if (err) {
          reject("No se pudo generarl el token");
        }
        resolve(token);
      }
    );
  });
};

module.exports = {
  generateJWT,
};
