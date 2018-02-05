const delays = (state = [], action) => {
  switch (action.type) {
    case 'SAVE_DELAY':
      state.unshift(action.props);
    default:
      return state;
  }
};

export default delays;
