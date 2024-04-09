const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const connect = require('./db/connect');


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