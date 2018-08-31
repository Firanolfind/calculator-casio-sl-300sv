const express = require('express');
const httpProxy = require('http-proxy');
const { choosePort, createCompiler, prepareProxy, prepareUrls } = require('react-dev-utils/WebpackDevServerUtils');
const paths = require('../config/paths');
const { resolveApp } = require('../config/paths');

const app = express();
const proxy = httpProxy.createProxyServer();

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

const proxySetting = require(paths.appPackageJson).proxy;
const proxyTarget = process.argv.indexOf('--mockapi') > 0 ? proxySetting.mock : proxySetting.backend;

proxy.on('error', (err) => {
  console.error(`Could't connect to ${proxyTarget}`);
});

app.use((req, res, next) => {
  if (req.url.match(new RegExp('^/api/'))) proxy.proxyRequest(req, res, { target: proxyTarget });
  else next();
});

app.use(express.static('build'));
app.get('/*', (req, res) => res.sendFile(resolveApp('build/index.html')));

choosePort(HOST, DEFAULT_PORT)
  .then((port) => {
    if (port == null) return;

    app.listen(port, HOST, () => {
      console.log(`Demo server is listenning to port ${port}!`);
      console.log(`Server is also proxing ${proxyTarget}`);
    });
  })
  .catch((err) => {
    if (err && err.message) console.log(err.message);

    process.exit(1);
  });
