const passport = require('passport');
const { Strategy: BearerStrategy } = require('passport-http-bearer');
const jwt = require('./jwt');

passport.use(new BearerStrategy((token, done) => {
  jwt.verify(token)
    .then((decoded) => {
      done(null, {
        id: decoded.user,
      });
    }, (err) => {
      done(null, false, {
        message: err.message,
      });
    });
}));
