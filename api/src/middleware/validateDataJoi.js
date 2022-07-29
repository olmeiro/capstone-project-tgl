const { errorResponse } = require("../utils/responses")
const boom = require("@hapi/boom");

const validateDataJoi = (schema, property)=>{
    return (req,res,next)=>{
        const data = req[property]
        const {error} = schema.validate(data)

        if(error){
            errorResponse(req, res, boom.badRequest(error));
        }else{
            next();
        }
    }
} 

module.exports = {
    validateDataJoi
}