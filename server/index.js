const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const http = require('http');
const cors = require('cors');
const auth = require('./utils/auth');
const loginRoutes = require('./routes/login');
const delayRoutes = require('./routes/delay');

function getApp() {
  const app = express();

  app.use(bodyParser.json());

  app.use(cors());

  app.use(passport.initialize());

  app.post('/login/email', loginRoutes.passwordless);

  app.post('/delay', delayRoutes.save);
  app.get('/delay', delayRoutes.list);

  // 404 handling
  app.use((req, res, next) => {
    const err = new Error(`${req.path} not found`);
    err.httpCode = 404;
    next(err);
  });

  // Provide errors as JSON
  app.use((err, req, res, next) => {
    const httpCode = err.httpCode || 500;
    res.status(httpCode);
    res.json({
      message: err.message,
    });
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
  const httpPort = process.env.PORT || 5000;
  exports.startServer(httpPort)
    .then(() => {
      console.log(`Listening on ${httpPort}`);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
