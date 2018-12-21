const jwt = require('jsonwebtoken');

const user = (state = {}, action) => {
  switch (action.type) {
    case 'USER_REGISTERING': {
      return {
        status: 'loading',
      };
    }
    case 'USER_REGISTERED': {
      return {
        status: 'registered',
      };
    }
    case 'USER_REGISTER_ERROR': {
      return {
        status: 'error',
        message: action.message,
      };
    }
    case 'USER_LOGIN': {
      const decoded = jwt.decode(action.token);
      return {
        status: 'ok',
        token: action.token,
        id: decoded.user,
      };
    }
    case 'USER_LOGOUT': {
      return {};
    }
    default: {
      return state;
    }
  }
};

export default user;
