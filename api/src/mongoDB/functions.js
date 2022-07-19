const { BSONType } = require('mongodb');
const client = require('./mongoConnect.js');

const dbName = "socialNetwork"; //database name
const collName = "users"; //collection name

async function createUser(data) {
    try {
        await client.connect();
        const collection = client.db(dbName).collection(collName);
        const doc = await collection.insertOne(data);
        console.log(doc);

    } catch (err ) {
        console.log(err.stack);

    } finally {
        await client.close();
    }
}

async function findUser(data) {
    try {
        await client.connect();
        const collection = client.db(dbName).collection(collName);
        const doc = await collection.findOne(data);
        console.log(doc);

    } catch (err ) {
        console.log(err.stack);

    } finally {
        await client.close();
    }
}

async function findAllUsers() {
    try {
        await client.connect();
        const collection = client.db(dbName).collection(collName);
        const doc = await collection.find({}).limit(10).toArray();
        console.log(doc);

    } catch (err ) {
        console.log(err.stack);

    } finally {
        await client.close();
    }
}

/*let data = {
    "name": "Esteban Rejas",
    "username":"Es456Rit",
    "email":"freddymt123@gmail.com",
    "password":"1234",
    "createDate": new Date(),
    "delete": { 
        "status": "No",
        "deleteDate": new Date(),
        },
    "active": Boolean(1),
    "likes": 0,
}*/

//createUser(data).catch(console.dir);
//findUser({name: "Esteban Rejas"});
findAllUsers();
//module.exports(createUser, findUser, findAll);
