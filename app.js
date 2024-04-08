const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;
const uri = 'mongodb://localhost:27017'; 
const dbName = 'Ecomm-'; 
app.use(express.json());

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connect() {
  try {
    await client.connect();

    console.log('Connected to MongoDB server');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connect();

app.post('/users', async (req, res) => {
  try {
    const db = client.db(dbName);

    const collection = db.collection('users');

    await collection.insertOne(req.body);

    res.status(201).send('User added successfully');
  } catch (error) {
    console.error('Error inserting user into MongoDB:', error);
    res.status(500).send('Error inserting user into MongoDB');
  }
});

app.get('/users', async (req, res) => {
  try {
    // Access the database
    const db = client.db(dbName);
    const collection = db.collection('users');

    const users = await collection.find({}).toArray();

    res.json(users);
  } catch (error) {
    console.error('Error retrieving users from MongoDB:', error);
    res.status(500).send('Error retrieving users from MongoDB');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
