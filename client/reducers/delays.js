import uuid from 'uuid/v4';

const delays = (state = [], action) => {
  switch (action.type) {
    case 'SAVE_DELAY':
      action.props.id = uuid();
      state.unshift(action.props);
    default:
      return state;
  }
};

export default delays;
