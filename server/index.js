require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const redis = require('redis');
const cors = require('cors');
const path = require('path');
const db = require('../database/mongoSchema');

const app = express();
const client = redis.createClient();

const cache = (req, res, next) => {
  const id = req.params.id;
  client.get(id, (err, data) => {
    if (err) { throw err; }
    if (data !== null) {
      const result = JSON.parse(data);
      res.send(result);
    } else {
      next();
    }
  });
};

// app.get('*.js', (req, res, next) => {
//   req.url += '.gz';
//   res.set('Content-Encoding', 'gzip');
//   next();
// });

app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(cors());
const port = 3002;

app.get('/api/bookings/:id', cache, async (req, res) => {
  try {
    console.log(req.params.id);
    const data = await db.find(req.params.id);
    client.setex(req.params.id, 180, JSON.stringify(data));
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

app.listen(port, () => console.log(`listening on port ${port}`));
