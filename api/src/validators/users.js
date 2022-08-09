const { check } = require("express-validator");
const { validateResult } = require("../helpers/validateHelper");

const validateCreate = [
    check("alias")
        .exists().withMessage("El alias es un campo requerido")
        .custom((value, { req }) => {
            if (value.trim() == "") throw new Error("El alias no puede ser vacio")
            return true
        })
        .isLength({ min: 4 }).withMessage("El alias debe tener al menos 4 caracteres")
        .matches(/^[A-Za-z0-9\s]+$/).withMessage("El alias solo puede ser letras o números sin caracteres especiales"),
    check("name")
        .exists().withMessage("El name es un campo requerido")
        .custom((value, { req }) => {
            if (value.trim() == "") throw new Error("El name no puede ser vacio")
            return true
        })
        .matches(/^[A-Za-z\s]+$/).withMessage("El name solo puede contener letras"),
    check("email")
        .exists().withMessage("El email es un campo requerido")
        .isEmail().withMessage("El email no es correcto"),
    check("phone")
        .isNumeric().withMessage("El phone debe contener solo números")
        .isLength({ min: 10, max: 10 }).withMessage("El phone es un número móvil de 10 dígitos."),
    check("password")
        .exists().withMessage("La password es un campo requerido")
        .isLength({min:6}).withMessage("El password debe contener al menos 6 caracteres")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])/).withMessage("El password debe contener al menos una mayuscula y una minúscula"),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateCreate }