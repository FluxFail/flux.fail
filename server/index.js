const auth = require('./utils/auth');
const loginRoutes = require('./routes/login');
const delayRoutes = require('./routes/delay');
const v1ApiDoc = require('./api-v1/api-doc.yml');
const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const http = require('http');
const cors = require('cors');
const validate = require('./utils/validate');
const openapi = require('express-openapi');
const v1DelayService = require('./api-v1/services/delayService');
const YAML = require('yamljs');

function getApp() {
  const app = express();
  validate.initialize();

  app.use(bodyParser.json());

  app.use(cors());

  app.use(passport.initialize());

  const yamlObject = YAML.load('./server/api-v1/api-doc.yml');

  openapi.initialize({
    apiDoc: yamlObject,
    app: app,
    dependencies: {
      delayService: v1DelayService
    },
    paths: './server/api-v1/paths'
  });
  
  /*app.post('/login/email', loginRoutes.passwordless);
  app.post('/login/exchange', loginRoutes.exchange);

  app.post('/delay', delayRoutes.save);
  app.get('/delay', delayRoutes.list);
  app.delete('/delay/:id', delayRoutes.del);

  // 404 handling
  app.use((req, res, next) => {
    const err = new Error(`${req.path} not found`);
    err.httpCode = 404;
    next(err);
  }); */

  // Provide errors as JSON
  app.use((err, req, res, next) => {
    const httpCode = err.httpCode || err.status || 500;
    res.status(httpCode);
    const errorPayload = {
      message: err.message,
    };
    if (httpCode === 422 && err.validationErrors) {
      errorPayload.validation = err.validationErrors;
    }
    res.json(errorPayload);
  });

  return app;
}

exports.startServer = (port) => {
  const p = new Promise((resolve, reject) => {
    const app = getApp();
    const server = new http.Server(app);
    server.listen(port, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(server);
    });
  });
  return p;
};

if (!module.parent) {
  // Run as standalone
  const httpPort = process.env.PORT || 8080;
  exports.startServer(httpPort)
    .then(() => {
      console.log(`Listening on ${httpPort}`);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
