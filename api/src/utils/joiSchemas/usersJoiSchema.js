const joi = require("joi");

const nickName = joi.string().alphanum().min(1).max(10)
const firstName = joi.string().alphanum().min(1).max(20)
const phoneNumber = joi.number().positive().min()

const id = joi.number();

const userSchema = joi.object({
    alias: nickName.required(),
    nombre: firstName.required(),
    phoneNumber: phoneNumber.optional()
})

const userDetailSchema = joi.object({
    id: id.required()
})

module.exports = { userSchema, userDetailSchema };