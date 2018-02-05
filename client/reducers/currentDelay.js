const currentDelay = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_DELAY':
      return {
        date: action.date,
      };
    case 'CANCEL_DELAY':
      return {};
    case 'SAVE_DELAY':
      return {};
    default:
      return state;
  }
};

export default currentDelay;
