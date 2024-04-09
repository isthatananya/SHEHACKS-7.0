const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
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
app.use(bodyParser.json());
// Signup route
app.post('/signup', async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection('users');

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user object
    const newUser = {
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    };

    // Insert the user into the database
    await collection.insertOne(newUser);

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Error creating user' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection('users');

    // Find the user by email
    const user = await collection.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(req.body.password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
