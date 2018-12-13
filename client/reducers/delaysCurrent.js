const currentDelay = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_DELAY':
      return {
        scheduled_departure: action.scheduled_departure,
      };
    case 'EDIT_DELAY':
      return action.props;
    case 'ONEPLUS_DELAY':
      return {
        ...action.props,
        id: null,
        user: action.user.id,
        parent: action.props.id,
      };
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
