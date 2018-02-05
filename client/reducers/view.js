const view = (state = 'home', action) => {
  switch (action.type) {
    case 'NAVIGATE_TO':
      if (action.target === 'logout') {
        return 'home';
      }
      return action.target;
    default:
      return state;
  }
};

export default view;
