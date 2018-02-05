const view = (state = 'home', action) => {
  switch (action.type) {
    case 'NAVIGATE_TO':
      return action.target;
    default:
      return state;
  }
};

export default view;
