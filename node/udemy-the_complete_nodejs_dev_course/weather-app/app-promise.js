const yargs = require('yargs');
const axios = require('axios');

const secret = require('./secret');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h').argv;

const geocodeURL = `http://maps.googleapis.com/maps/api/geocode/json`;

const weatherApiKey = secret.darkSky.apiKey;
const weatherUrl = `https://api.darksky.net/forecast/${weatherApiKey}/`;

axios
  .get(geocodeURL, {
    params: {
      address: argv.address
    }
  })
  .then(response => {
    if (response.data.status === 'ZERO_RESULTS') {
      throw new Error('Unable to find that address.');
    }

    console.log('Address: ', response.data.results[0].formatted_address);

    const { lat, lng } = response.data.results[0].geometry.location;

    return axios.get(`${weatherUrl}${lat},${lng}`);
  })
  .then(response => {
    const { temperature, apparentTemperature } = response.data.currently;

    console.log(
      `It's currently ${temperature}. It feels like ${apparentTemperature}.`
    );
  })
  .catch(e => {
    if (e.code === 'ENOTFOUND') {
      console.log('Unable to connect to API servers');
    } else {
      console.log(e.message);
    }
  });
