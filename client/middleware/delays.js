function findDelay(id, store) {
  const state = store.getState();
  if (!state.delays) {
    return null;
  }
  const matched = state.delays.reported.filter(delay => delay.id === id);
  if (!matched.length) {
    return null;
  }
  return matched[0];
}

const delays = store => next => (action) => {
  switch (action.type) {
    case 'EDIT_DELAY': {
      const delay = findDelay(action.id, store);
      return next({
        type: action.type,
        props: delay,
      });
    }
    default: {
      return next(action);
    }
  }
};

export default delays;
