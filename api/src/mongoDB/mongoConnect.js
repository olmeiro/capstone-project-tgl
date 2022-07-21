const { MongoClient, ServerApiVersion } = require('mongodb');

const User = encodeURIComponent("Alberto_user");
const password = encodeURIComponent("alberto1234");

const authMechanism = "SCRAM-SHA-1";

const uri = `mongodb+srv://${User}:${password}@clusterbank.5fkz2.mongodb.net/?authMechanism=${authMechanism}&retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

module.exports = client;