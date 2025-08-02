
import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://rafaelmartinez011dev:Julio11@nasa-project.hcuhty9.mongodb.net/?retryWrites=true&w=majority&appName=Nasa-Project";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const mongodb = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await mongodb.connect();
    // Send a ping to confirm a successful connection
    await mongodb.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await mongodb.close();
  }
}
run().catch(console.dir);
