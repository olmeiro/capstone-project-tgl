
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Freddy:<password>@clusterbank.5fkz2.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("socialNetwork").collection("users");
  // perform actions on the collection object
  client.close();
});
