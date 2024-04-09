const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017'; // Change this to your MongoDB URI

// Database Name
const dbName = 'mydatabase'; // Change this to your database Name

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to the MongoDB server
async function connect() {
  try {
    // Connect to the MongoDB server
    await client.connect();

    console.log('Connected to MongoDB server');

    // Access the database
    const db = client.db(dbName);

    // Perform operations on the database
    // Example: Insert a document into a collection
    const collection = db.collection('mycollection');
    await collection.insertOne({ name: 'John', age: 30 });

    console.log('Document inserted');

    // Example: Find documents in a collection
    const documents = await collection.find({}).toArray();
    console.log('Documents found:', documents);

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  } finally {
    // Close the connection when done
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Call the connect function to establish the connection
connect();
