const express = require('express');
const db = require('../database/index.js');
let app = express();
const bodyParser = require('body-parser');
const cors = require('cors');


app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(cors());

let port = 1128;


app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

app.get('/bookings/:id', function (req, res) {

  res.send('hiiiii');
  //want to make a request to database getting document at id...
  //send back document that matches that id...

});




