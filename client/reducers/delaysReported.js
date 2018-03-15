const delays = (state = [], action) => {
  switch (action.type) {
    case 'USER_LOGOUT': {
      return [];
    }
    case 'DELAYS_LOADED': {
      return action.delays;
    }
    case 'SAVE_DELAY': {
      const saveState = state.slice(0);
      const matching = saveState.filter((d) => d.id === action.props.id);
      if (!matching.length) {
        saveState.unshift({
          ...action.props,
        });
        return saveState;
      }
      return saveState.map((delay) => {
        if (delay.id !== action.props.id) {
          return delay;
        }
        return action.props;
      });
    }
    case 'DELETE_DELAY': {
      return state.filter(delay => delay.id !== action.id);
    }
    default: {
      return state;
    }
  }
};

export default delays;
