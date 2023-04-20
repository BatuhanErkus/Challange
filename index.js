const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Use body-parser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/getPdfUrl', function(req, res) {
  const pin = req.query.pin;
  if (pin === '1337') {
    res.send({
      url: 'file:///C:/Users/batuhan/Desktop/Insurance.pdf'
    });
  } else {
    res.status(401).send('Invalid PIN');
  }
});

app.post('/api/saveWizardData', function(req, res) {
  const wizardData = req.body;
  // Save wizardData to database
  res.send('Wizard data saved successfully');
});

// Start the server
app.listen(5000, () => {
  console.log('Server started on port 5000');
});
