import express from "express";
import path from "path";

const server = express();

// set up webpack
const webpack = require("webpack");
const config = require("../../config/webpack.dev");
const compiler = webpack(config);

// rebuild on file change
const webpackDevMiddleware = require("webpack-dev-middleware")(
  compiler,
  config.devServer
);
server.use(webpackDevMiddleware);

// hot reload
// needs to be after devMiddleware but before staticMiddleware
const webpackHotMiddleware = require("webpack-hot-middleware")(compiler);
server.use(webpackHotMiddleware);

// serve static files
const staticMiddleware = express.static("dist");
server.use(staticMiddleware);

const PORT = config.devServer.port;
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
