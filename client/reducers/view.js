const view = (state = 'home', action) => {
  switch (action.type) {
    case 'ADD_DELAY':
      return 'home';
    case 'USER_LOGOUT':
      return 'home';
    case 'NAVIGATE_TO':
      return action.target;
    default:
      return state;
  }
};

export default view;
