const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
//My fookin Imports
const AuthRoutes = require('./routes/Auth')
const app = express();

app.use(express.static('public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//cookie Parser
app.use(cookieParser())
const dbURI = 'mongodb+srv://demo_user:demo123@demo.eumge.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {

    console.log('Server started on 3000')
    app.listen(3000)
  })
  .catch((err) => console.log(err));
app.use(AuthRoutes);

app.get('/setCookies', (req, res) => {
  res.cookie('NewUser', true);
  res.send('Cookies setted!')
})
app.get('/getCookies', (req, res) => {
  const cookies = req.cookies;
  console.log(cookies)
  res.json(cookies)
})

app.use('/', (Req, res) => {

  res.send('<h1>Home Page</h1>');
})

