const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const  dotenv = require('dotenv');
dotenv.config();
const connect = require('./db/connect');

const userRoutes = require('./router/userRoutes');  
app.use(express.json());
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
  res.send('Server is on!');
});

async function start(){
  await connect();
  app.listen(port, () => {
    console.log(`Server is running on port ${port}, you may visit http://localhost:${port}`);
  });

}
start();