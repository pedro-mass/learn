// input: USD CAD 23
// output: 23 USD is worth 29 CAD. You can spend these in the following countries:

// API for exchange:  fixer.io
// http://api.fixer.io/latest?base=USD
//
// API for countries: https://restcountries.eu/#api-endpoints-currency
// https://restcountries.eu/rest/v2/currency/usd

const axios = require('axios');

const getExchangeRate = async (from, to) => {
  let response;
  try {
    response = await axios.get(`http://api.fixer.io/latest?base=${from}`);
  } catch (e) {
    throw new Error(`
      : ${from}.`);
  }

  if (!response.data.rates[to]) {
    throw new Error(`Could not convert from ${from} to ${to}.`);
  }

  return response.data.rates[to];
};

const getCountriesForCurrency = async countryCode => {
  try {
    let response = await axios.get(
      `https://restcountries.eu/rest/v2/currency/${countryCode}`
    );

    return response.data.map(country => country.name);
  } catch (e) {
    throw new Error(`Unable to get countries that use ${countryCode}.`);
  }
};

const convertCurrency = async (from, to, amount) => {
  // get the exchange rate
  const exchangeRate = await getExchangeRate(from, to);
  const countryPromise = getCountriesForCurrency(to); // start the promise now

  // figure out the amount of money I have
  const money = amount * exchangeRate;

  // Get the countries where I can use the money
  const countries = await countryPromise; // wait for the promise to finish

  return `${amount} ${from} is worth ${money} ${to}. You can spend these in the following countries: ${countries.join(
    ', '
  )}`;
};

// getExchangeRate('USD', 'CAD').then(console.log).catch(console.log);
// getCountriesForCurrency('CAD').then(console.log).catch(console.log);
convertCurrency('USD', 'CAD', 23).then(console.log).catch(console.log);
