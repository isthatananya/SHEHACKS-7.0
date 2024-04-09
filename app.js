const express = require('express');
const app = express();
const port = process.env.PORT || 5500;
const  dotenv = require('dotenv');
dotenv.config();
const connect = require('./db/connect');
const cors = require('cors');
app.use(cors());
const userRoutes = require('./router/userRoutes');  
const travelRoutes = require('./router/travelRoutes');
app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/travel', travelRoutes);

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