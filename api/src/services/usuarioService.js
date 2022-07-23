const client = require('../mongoDB/mongoConnect');

const dbName = "socialNetwork"; //database name
const collName = "users"; //collection name

async function getUsuarios() {
    try {
        await client.connect();
        const collection = client.db(dbName).collection(collName);
        const doc = await collection.find({}).project({ _id: 0 }).limit(10).toArray();
        return doc;
        
    } catch (err) {
        console.log(err.stack);

    } finally {
        await client.close();
    }
}

async function getUsuarioPorId(data) { //data = "1234"
    try {
        await client.connect();
        const collection = client.db(dbName).collection(collName);
        const doc = await collection.findOne({_id: BSON.ObjectId(data)}).project({ _id: 0, delete: 0, active: 0 }); //data: {"62d5c34f192a8fbf7979b6e3"}
        return doc;

    } catch (err) {
        console.log(err.stack);

    } finally {
        await client.close();
    }
}

async function getUsuarioPorAlias(data) { //data = { alias : "@freddy"}
    try {
        await client.connect();
        const collection = client.db(dbName).collection(collName);
        const doc = await collection.findOne({data, "delete.status" : "false", active: "true"}).project({ _id: 0, delete: 0, active: 0 }); 
        return doc;

    } catch (err) {
        console.log(err.stack);

    } finally {
        await client.close();
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


module.exports = { 
    getUsuarios,
    getUsuariosPorId, 
    getUsuarioPorAlias, 
    postUsuario, 
    putUsuario, 
    deleteUsuario 
};