const sortDelays = (a, b) => {
  if (a.scheduled_departure < b.scheduled_departure) {
    return 1;
  }
  if (a.scheduled_departure > b.scheduled_departure) {
    return -1;
  }
  return 0;
};

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
      const matching = saveState.filter(d => (
        d.id === action.props.id));
      if (!matching.length) {
        saveState.unshift({
          ...action.props,
        });
        saveState.sort(sortDelays);
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
      return state.filter(delay => (
        delay.id !== action.id && delay.plusOnes.filter(plusOne => (
          plusOne.id === action.id)).length === 0));
    }
    default: {
      return state;
    }
  }
};

export default delays;
