const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Server is on!');
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}, you may visit http://localhost:${port}`);
});