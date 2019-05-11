const debug = require("debug");

const log = debug("mylib:randomid");

log("Library loaded");

function getRandomId() {
  log("Computing random id");
  const outcome = Math.random()
    .toString(36)
    .substr(2);
  log('Random ID is "%s"', outcome);
  return outcome;
}

module.exports = { getRandomId };
