import urlParser from 'url';
import queryString from 'querystring';

const user = store => next => (action) => {
  switch (action.type) {
    case 'INITIALIZE': {
      const token = localStorage.getItem('fluxfail_token');
      if (token) {
        // Already logged in
        next({
          type: 'USER_LOGIN',
          token,
        });
        next(action);
        return;
      }
      if (window.location.search && window.location.search.indexOf('?token=') !== -1) {
        // User clicked passwordless link
        const query = queryString.parse(window.location.search.slice(1));
        if (!query.token) {
          next(action);
          return;
        }
        // Clean up URL
        if (window.history && window.history.replaceState) {
          const url = urlParser.parse(window.location.href);
          window.history.replaceState({}, 'clear', url.pathname);
        }

        // Exchange token
        next({
          type: 'USER_REGISTERING',
        });
        fetch(`${API_URL}/login/exchange`, {
          body: JSON.stringify({
            token: query.token,
          }),
          headers: {
            'content-type': 'application/json',
          },
          method: 'POST',
        })
          .then((res) => {
            if (res.status !== 200) {
              throw new Error(res.statusText);
            }
            return res.json();
          })
          .then((credentials) => {
            localStorage.setItem('fluxfail_token', credentials.token);
            next({
              type: 'USER_LOGIN',
              token: credentials.token,
            });
            next(action);
          }, (err) => {
            next({
              type: 'USER_REGISTER_ERROR',
              message: err.message,
            });
            next(action);
          });
      }
      return;
    }
    case 'USER_REGISTER': {
      next({
        type: 'USER_REGISTERING',
      });
      fetch(`${API_URL}/login/email`, {
        body: JSON.stringify({
          email: action.email,
        }),
        headers: {
          'content-type': 'application/json',
        },
        method: 'POST',
      })
        .then((res) => {
          if (res.status !== 202) {
            next({
              type: 'USER_REGISTER_ERROR',
              message: res.statusText,
            });
            return;
          }
          next({
            type: 'USER_REGISTERED',
          });
        }, (err) => {
          next({
            type: 'USER_REGISTER_ERROR',
            message: err.message,
          });
        });
      return;
    }
    case 'USER_LOGOUT': {
      localStorage.removeItem('fluxfail_token');
      next(action);
      return;
    }
    default: {
      next(action);
    }
  }
};

export default user;
