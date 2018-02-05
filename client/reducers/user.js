const user = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.user;
    case 'NAVIGATE_TO':
      if (action.target !== 'logout') {
        return state;
      }
      return {};
    default:
      return state;
  }
};

export default user;
