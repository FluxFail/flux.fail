const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').strategy;
const jwt = require('./jwt');

passport.use(new BearerStrategy((token, done) => {
  jwt.verify(token)
    .then((user) => {
      done(null, user)
    }, (err) => {
      done(null, false, {
        message: err.message,
      });
    });
}));
