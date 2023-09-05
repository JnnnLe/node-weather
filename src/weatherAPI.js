const request = require('postman-request');
const chalk = require('chalk');
const api_key = 'ce8e850a26092946a008066840002c71';
const baseURL = 'http://api.weatherstack.com/current';

// console.log(process.env.WEATHER_API)


const forecast = (loc, cb) => {
  console.log({ api_key })
  const url = `${baseURL}?access_key=${api_key}&query=${loc}&units=f`;

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