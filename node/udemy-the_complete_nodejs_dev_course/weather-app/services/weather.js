const request = require('request');

const secret = require('../secret');

const API_KEY = secret.darkSky.apiKey;
const ENDPOINT = `https://api.darksky.net/forecast/${API_KEY}/`;

const get = ({ latitude, longitude }, callback) => {
  request(
    {
      url: `${ENDPOINT}${latitude},${longitude}`,
      json: true
    },
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        callback(undefined, {
          temperature: body.currently.temperature,
          apparentTemperature: body.currently.apparentTemperature
        });
      } else {
        callback('Unable to fetch weater');
      }
    }
  );
};

module.exports = {
  get
};
