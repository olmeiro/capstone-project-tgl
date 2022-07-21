const client = require('./mongoConnect.js');

const dbName = "socialNetwork"; //database name
const collName = "users"; //collection name

/*async function createUser(data) {
    try {
        await client.connect();
        const collection = client.db(dbName).collection(collName);
        const doc = await collection.insertOne(data).project({ _id: 0 });
        return doc;

    } catch (err) {
        console.log(err.stack);

    } finally {
        await client.close();
    }
}*/

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

async function getUsuarioPorId(data) {
    try {
        await client.connect();
        const collection = client.db(dbName).collection(collName);
        const doc = await collection.findOne({_id: BSON.ObjectId(data)}).project({ _id: 0 }); //data: {"62d5c34f192a8fbf7979b6e3"}
        return doc;

    } catch (err) {
        console.log(err.stack);

    } finally {
        await client.close();
    }
}

async function getUsuarioPorAlias(data) {
    try {
        await client.connect();
        const collection = client.db(dbName).collection(collName);
        const doc = await collection.findOne({alias : data}).project({ _id: 0 }); //data: {"@freddy"}
        return doc;

    } catch (err) {
        console.log(err.stack);

    } finally {
        await client.close();
    }
}

module.exports = { createUser, findUser, findAllUsers };