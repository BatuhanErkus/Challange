const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

// Endpoint to fetch the PDF document
app.get('/pdf', (req, res) => {
  res.sendFile(__dirname + 'document.pdf');
});

// Endpoint to collect the signature
app.post('/signature', (req, res) => {
  const name = req.body.name;
  const pin = req.body.pin;
  
  if (pin === '1337') {
    res.send({ success: true });
  } else {
    res.send({ success: false, message: 'Invalid PIN' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
