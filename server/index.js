const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const db = require('../database/mongoSchema');

const app = express();

app.use(express.static(`${__dirname}/../client/dist`));
app.use(bodyParser.json());
app.use(cors());
const port = 3002;

app.get('/api/bookings/:id', (req, res) => {
  db.find(req.params.id)
    .then(data => res.send(data));
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/index.html'), (err) => {
    if (err) { res.status(500).send(err); }
  });
});

app.listen(port, () => console.log(`listening on port ${port}`));
