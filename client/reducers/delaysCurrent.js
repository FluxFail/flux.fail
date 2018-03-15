const currentDelay = (state = {}, action) => {
  console.log(action.type, action.message);
  switch (action.type) {
    case 'ADD_DELAY':
      return {
        date: action.date,
      };
    case 'EDIT_DELAY':
      return action.props;
    case 'CANCEL_DELAY':
      return {};
    case 'SAVE_DELAY':
      return {};
    case 'NAVIGATE_TO':
      return {};
    case 'USER_LOGOUT':
      return {};
    default:
      return state;
  }
};

export default currentDelay;
