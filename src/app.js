require('dotenv').config();
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const chalk = require('chalk');
const forecast = require('./weatherAPI.js');
const app = express();
const port = process.env.PORT || 3001;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'J. Lê Antalek',
  })
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'J. Lê Antalek',
    intro: 'Hello, my name is Jennifer Lê Antalek!',
    hobby: 'I like to travel. ✈️'
  })
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'J. Lê Antalek',
    msg: 'Although there is still so much to learn, I am here to help! Freely AMA Javascript and web development related here'
  })
});

app.get('/weather', async (req, res) => {
  if (!req.query.search) {
    return res.send({
      err: 'Please provide a search term in the web URL.'
    })
  }

  forecast(req.query.search, (err, { weather,
    location,
    temp } = data) => {
    if (err) res.send({ err })
    res.send({
      weather,
      location,
      temp,
    })
  })
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'UH-oH',
    name: 'Jennifer Lê Antalek',
    msg: 'Sorry, help page was not found.'
  })
});

app.get('*', (req, res) => {
  res.render('404', {
    title: 'UH-oH',
    name: 'Jennifer Lê Antalek',
    msg: 'Sorry this page was not found.'
  })
});

app.listen(port, () => {
  console.log(chalk.bgBlue(`Express app listening on port ${port}`));
});