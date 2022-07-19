const { MongoClient, ServerApiVersion } = require('mongodb');

const User = "Alberto_user";
const password = "alberto1234";

const uri = `mongodb+srv://${User}:${password}@clusterbank.5fkz2.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

/*async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}

run().catch(console.dir);
*/

module.exports = client;