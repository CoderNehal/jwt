const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const { readFileSync } = require('fs');

const path = require('path');
//My fookin Imports
const root = require('./utils/root')
const AuthRoutes = require('./routes/Auth');
const {requireAuth} = require('./middlewares/AuthMiddleware')
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

app.get('/cards', requireAuth , (req, res) => {
  const html = readFileSync(path.join(root, 'views', 'cards.html'), 'utf-8', (err, data) => {
    return data;
  });
  res.send(html);
})
app.use('/', (Req, res) => {

  const html = readFileSync(path.join(root, 'views', 'homepage.html'), 'utf-8', (err, data) => {
    return data;
  });
  res.send(html);
})

