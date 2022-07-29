const { models } = require("../db/sequelize");
const bcrypt = require('bcryptjs')
const boom = require("@hapi/boom");

const { User } = models;

class UserService {
    constructor() {

    }

    static async getAllUsers() {
        try {
            const allUsers = await User.findAll();
            if (allUsers.length == 0) {
                throw boom.notFound("Users has not been found");
            }
            return allUsers;
        } catch (error) {
            console.log("EEEEEEEEEEEEEEEEEEE ",error)
            throw boom.internal(error.message);
        }
    }

    static async getUserByAlias(alias) {
        try {
            const user = await User.findOne({ where: { alias } })
            if (!user) {
                throw boom.notFound(`The user with nickname ${alias} has not been found`);
            }
            return user;
        } catch (error) {
            throw boom.internal(error.message);
        }

    }

    static async getUserById(id) {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw boom.notFound(`User with id ${id} not found`);
            }
            return user;
        } catch (error) {
            throw boom.internal(error.message);
        }
    }

    static async postUser(newUser) {
        try {
            const encryptPassword = await bcrypt.hash(newUser.password, 14)
            const user = await User.create({
                ...newUser,
                password: encryptPassword
            });
            return user;
        } catch (error) {
            if(error.name =  'SequelizeUniqueConstraintError'){
                throw boom.badRequest(`El usuario con alias ${newUser.alias} ya se encuentra registrado. Intente con un nuevo alias.`);
            }else{
                throw boom.badRequest('Error en el registro.')
            }
        }
    }

    static async putUserById(newUser, id) {
        try {
            await User.update(newUser, { where: { id } });
        } catch (error) {
            throw boom.internal(error.message);
        }
    }

    static async deleteUserById(id) {
        try {
            await User.destroy({ where: { id } });
        } catch (error) {
            throw boom.internal(error.message);
        }
    }

    static async login(alias, password) {
        try {
            const user = await User.findOne({ where: { alias } })
            if (!user) {
                throw boom.notFound(`Usuario ${alias} no fue encontrado.`);
            }
            
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                throw boom.notFound(`Password is incorrect`);
            }
            return user;
        } catch (error) {
            throw boom.badData(error.message);
        }
    }
}

module.exports = UserService;