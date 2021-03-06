const { BSONType } = require('mongodb');
const client = require('./mongoConnect.js');

const dbName = "socialNetwork"; //database name
const collName = "users"; //collection name
// app.get('/', async (req, res) => {
//   res.json(await findAllUsers())
// })

// app.post('/', async (req, res) => {
//   const  data  = req.body;
//   console.log("Dataaa",data)
//   res.json(await createUser(data))
// })
async function createUser(data) {
    try {
        await client.connect();
        const collection = client.db(dbName).collection(collName);
        const doc = await collection.insertOne(data).project({ _id: 0 });
        //console.log(doc);
        return doc

    } catch (err) {
        console.log(err.stack);

    } finally {
        await client.close();
    }
}

async function findUser(data) {
    try {
        await client.connect();
        const collection = client.db(dbName).collection(collName);
        const doc = await collection.findOne(data).project({ _id: 0 });
        //console.log(doc);
        return doc

    } catch (err) {
        console.log(err.stack);

    } finally {
        await client.close();
    }
}

async function findAllUsers() {
    try {
        await client.connect();
        const collection = client.db(dbName).collection(collName);
        const doc = await collection.find({}).project({ _id: 0 }).limit(10).toArray();
        console.log(doc);
        return doc;
        
    } catch (err) {
        console.log(err.stack);

    } finally {
        await client.close();
    }
}

/*let data = {
    "id_":"23452345"
    "name": "Esteban Rejas",
    "username":"Es456Rit",
    "email":"freddymt123@gmail.com",
    "password":"1234",
    "createDate": new Date(),
    "delete": { 
        "status": "no",
        "deleteDate": new Date(),
        },
    "active": Boolean(1),
    "likes": ["id":"4567",],
    "comments":[ {"id": "1234", "text":"asbas", "id_write": "123"}, {}, {}]
    "favoritos": []
    "fotos": ["nombreFoto": "imgA0000001"]
}*/

//createUser(data).catch(console.dir);
//findUser({name: "Esteban Rejas"});
//findAllUsers();

module.exports = { createUser, findUser, findAllUsers };
