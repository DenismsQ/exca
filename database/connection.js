
const { MongoClient, ServerApiVersion } = require('mongodb');

async function connectToMongoDB() {
    try {
        const uri = "mongodb+srv://admin:admin@cluster0.a5og7rz.mongodb.net/MySite";
        const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
   return uri;
    } catch (err) {
    console.log(err);
}
}
module.exports = connectToMongoDB;

