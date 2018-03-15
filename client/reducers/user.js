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
      return {
        status: 'ok',
        token: action.token,
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
