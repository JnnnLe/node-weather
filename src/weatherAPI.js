require('dotenv').config();
const request = require('postman-request');
const chalk = require('chalk');
const baseURL = 'http://api.weatherstack.com/current';

const forecast = (loc, cb) => {
  const url = `${baseURL}?access_key=${process.env.WEATHER_API_KEY}&query=${loc}&units=f`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      cb('Unable to connect to weather service!', undefined)
    } else if (body.err) {
      cb('Unable to find location', undefined)
    } else {
      cb(undefined, {
        weather: body.current.weather_descriptions[0],
        location: `${body.location.name}, ${body.location.region}`,
        temp: body.current.temperature
      });
    }
  })
};

module.exports = forecast;