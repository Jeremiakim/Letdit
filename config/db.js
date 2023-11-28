const { MongoClient, ObjectId } = require("mongodb");

// Replace the uri string with your connection string.
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);
const dbName = "Letdit";
// console.log(dbName);

async function connect() {
  try {
    await client.connect();
    console.log("Successfully to connect mongodb");
    return client;
  } catch (error) {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

function getDatabase() {
  return client.db(dbName);
}

module.exports = {
  connect,
  getDatabase,
};
