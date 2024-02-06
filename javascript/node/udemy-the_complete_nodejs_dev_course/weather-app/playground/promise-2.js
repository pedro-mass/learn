const request = require('request');

const address = (address, callback) => {
  return new Promise((resolve, reject) => {
    const encodedAddress = encodeURIComponent(address);

    request(
      {
        url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json: true
      },
      (error, response, body) => {
        if (error) {
          reject('Unable to connect to Google servers.');
        } else if (body.status === 'ZERO_RESULTS') {
          reject('Unable to find that address.');
        } else if (body.status === 'OK') {
          resolve({
            address: body.results[0].formatted_address,
            latitude: body.results[0].geometry.location.lat,
            longitude: body.results[0].geometry.location.lat
          });
        }
      }
    );
  });
};

address('11206').then(
  location => {
    console.log(JSON.stringify(location, undefined, 2));
  },
  errorMessage => {
    console.log(errorMessage);
  }
);
