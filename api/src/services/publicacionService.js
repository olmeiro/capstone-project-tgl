const client = require('../mongoDB/mongoConnect');

const dbName = "socialNetwork"; //database name
const collName = "public"; //collection name

async function getPublicaciones() {
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

async function getPublicacionPorId(data) { //data = "62d5c34f192a8fbf7979b6e3"
    try {
        await client.connect();
        const collection = client.db(dbName).collection(collName);
        const doc = await collection.findOne({_id: BSON.ObjectId(data)}).project({ _id: 0, delete: 0, private: 0 });
        return doc;

    } catch (err) {
        console.log(err.stack);

    } finally {
        await client.close();
    }
}

async function postPublicacion(data) { //schema {"usuarioId":"","descripcion":"","fotoId":"","fecha":"","likes":""}
    try {
        await client.connect();
        const collection = client.db(dbName).collection(collName);

        data.delete = {"deleteDate": "0000-00-00T00:00:00Z", "status": false};
        data.private = false;

        const doc = await collection.insertOne(data);
        return doc;

    } catch (err) {
        console.log(err.stack);

    } finally {
        await client.close();
    }
}

async function putPublicacion(data) { // data = { filter: { key : "value" }, update : { key : "value" }}
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

async function agregarComentario(data) { // data = { filter: { id_public : "publicId" }, update : {comentarios: {comentId:"", fecha:"", alias:"", mensaje:""}}}
    try {
        await client.connect();
        const collection = client.db(dbName).collection(collName);
        const oldDoc = await collection.findOne({titulo: data.filter.titulo})
        const newArray = oldDoc.comentarios.push("hola"); //data.update.comentarios
        const filter = data.filter;
        const array = {comentarios : newArray};
        const update = { $set: array };
        const doc = await collection.updateOne({filter},{update});
        console.log(doc);
        return doc;

    } catch (err) {
        console.log(err.stack);

    } finally {
        await client.close();
    }
}

async function deletePublicacion(data) { // data = { filter: { key : value } }
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

data = { filter: { titulo : "foto amigos" }, update : {comentarios: {comentId:"1234123", fecha:"1234", alias:"1234", mensaje:"hola"}} };

agregarComentario(data);
//getPublicaciones();


/*module.exports = { 
    getPublicaciones,
    getPublicacionPorId,
    postPublicacion, 
    putPublicacion, 
    deletePublicacion 
};*/

