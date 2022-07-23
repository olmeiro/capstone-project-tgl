const client = require('../mongoDB/mongoConnect');


const boom = require("@hapi/boom"); // para manejar los errores
const usuarioSchema = require("../db/models/usuarioModel");

class UsuarioService {
    constructor() {

    }
    getUsuarios() {
   
    }
}

async function postUsuario(data) { //schema
    try {
        await client.connect();
        const collection = client.db(dbName).collection(collName);

        const homologacion = await collection.findOne( { alias : data.alias } )

        if (homologacion) {
            const msg = "Este usuario ya existe";
            return {response : msg};

        } else {
            data.delete = {"deleteDate": "0000-00-00T00:00:00Z", "status": false};
            data.active = true;

            const doc = await collection.insertOne(data);
            return doc;

        }

    } catch (err) {
        console.log(err.stack);

    } finally {
        await client.close();
    }
}

async function putUsuario(data) { // data = { filter: { key : "value" }, update : { key : "value" }}
    try {
        await client.connect();
        const collection = client.db(dbName).collection(collName);
        const filter = data.filter;
        const update = { $set: data.update };
        const doc = await collection.updateOne({filter},{update});
        return doc;

    } catch (err) {
        console.log(err.stack);

    } finally {
        await client.close();
    }
}

async function deleteUsuario(data) { // data = { filter: { key : value } }
    try {
        await client.connect();
        const collection = client.db(dbName).collection(collName);
        const filter = data.filter;
        const deleteDate = new Date();
        const update = { $set:{ "delete.status" : "true", "delete.deleteDate" : deleteDate }};
        const doc = await collection.updateOne({filter},{update});
        return doc;

    } catch (err) {
        console.log(err.stack);

    } finally {
        await client.close();
    }
}

module.exports = UsuarioService;
