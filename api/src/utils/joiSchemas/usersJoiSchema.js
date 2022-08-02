const joi = require("joi");

const alias = joi.string().alphanum().min(1).max(20)
const name = joi.string().alphanum().min(1).max(20)
const phone = joi.number().positive().min(1).max(30)
const email = joi.string().alphanum().min(1).max(20)
const password = joi.string().alphanum().min(1).max(20)

const id = joi.number();

const userSchema = joi.object({
    alias: alias.required(),
    name: name.required(),
    phone: phone.optional(),
    email: email.required(),
    password:password.required()
})

const userDetailSchema = joi.object({
    id: id.required()
})

module.exports = { userSchema, userDetailSchema };