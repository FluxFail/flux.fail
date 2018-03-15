const passport = require('passport');
const { Strategy: BearerStrategy } = require('passport-http-bearer');
const jwt = require('./jwt');

passport.use(new BearerStrategy((token, done) => {
  jwt.verify(token)
    .then((user) => {
      done(null, user);
    }, (err) => {
      done(null, false, {
        message: err.message,
      });
    });
}));
