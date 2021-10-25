const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
var bodyParser = require('body-parser')
//My fookin Imports
const SignUpRoutes = require('./routes/signup')
const app = express();

app.use(express.static('public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const dbURI = 'mongodb+srv://demo_user:demo123@demo.eumge.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => {

    console.log('Server started on 3000')
    app.listen(3000)
  })
  .catch((err) => console.log(err));
app.use(SignUpRoutes);

app.use('/', (Req, res) => {
  res.send('<h1>Home Page</h1>');
})

