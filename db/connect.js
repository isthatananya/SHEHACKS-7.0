const { MongoClient } = require('mongodb');

// MongoDB Atlas connection string
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connect() {
  const dbName = 'your_database_name_here';
  try {
    await client.connect();

    console.log('Connected to MongoDB Atlas');

    const db = client.db(dbName);

    const collection = db.collection('mycollection');
    await collection.insertOne({ name: 'John', age: 30 });

    console.log('Document inserted');

    const documents = await collection.find({}).toArray();
    console.log('Documents found:', documents);

  } catch (error) {
   
    onsole.error('Error connecting to MongoDB Atlas:', error);
  } finally {
    await client.close();
    console.log('MongoDB Atlas connection closed');
  }
}

connect();