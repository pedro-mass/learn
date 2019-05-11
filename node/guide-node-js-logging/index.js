const express = require("express");
const pino = require("pino");
const expressPino = require("express-pino-logger");

const randomId = require("./random-id");

const logger = pino({ level: process.env.LOG_LEVEL || "info" });
const expressLogger = expressPino({ logger });

const PORT = process.env.PORT || 3000;
const app = express();

app.use(expressLogger);

app.get("/", (req, res) => {
  logger.debug("Calling res.send");
  const id = randomId.getRandomId();
  res.send(`Hello World [${id}]`);
});

app.listen(PORT, () => {
  logger.info("Server running on port %d", PORT);
});
