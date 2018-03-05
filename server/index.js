const express = require('express');
let db = require('../database/');
let app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(cors());
const routes = ['bookings'];
let port = 1128;

app.get('/*', function(req, res) {
  if (routes.indexOf(req.url) === -1) {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  }
})

app.get('/bookings/:id', function (req, res) {
  console.log(req.params.id);
  // let cb = function (data) {
  //   res.send(data);
  // }
  // db.find(req.params.id, cb);
  res.send('hi');
});




app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

