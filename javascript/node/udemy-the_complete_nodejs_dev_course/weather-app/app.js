const yargs = require('yargs');

const geocode = require('./services/geocode');
const weather = require('./services/weather');

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

geocode.address(argv.address, (errorMessage, result) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(result.address);

    getWeather(result);
  }
});

const getWeather = ({ latitude, longitude }) => {
  weather.get({ latitude, longitude }, (errorMessage, weatherResult) => {
    if (errorMessage) {
      console.log(errorMessage);
    } else {
      console.log(
        `It's currently ${weatherResult.temperature}, but it feels like ${weatherResult.apparentTemperature}.`
      );
    }
  });
};
