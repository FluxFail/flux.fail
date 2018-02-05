import uuid from 'uuid/v4';

const delays = (state = [], action) => {
  switch (action.type) {
    case 'SAVE_DELAY':
      let saveState = state.slice(0);
      if (!action.props.id) {
        action.props.id = uuid();
        saveState.unshift(action.props);
        return saveState;
      }
      saveState.forEach((delay, idx) => {
        if (delay.id !== action.props.id) {
          return;
        }
        saveState[idx] = action.props;
      });
      return saveState;
    case 'DELETE_DELAY':
      let found = state.filter(delay => delay.id === action.id);
      if (!found.length) {
        return state;
      }
      let deleteState = state.slice(0);
      deleteState.splice(deleteState.indexOf(found[0]), 1);
      return deleteState;
    default:
      return state;
  }
};

export default delays;
