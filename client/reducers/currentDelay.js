const currentDelay = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_DELAY':
      return {
        date: action.date,
      };
    default:
      return state;
  }
};

export default currentDelay;
