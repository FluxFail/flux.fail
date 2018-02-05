function findDelay(id, store) {
  let state = store.getState();
  if (!state.delays) {
    return null;
  }
  let matched = state.delays.filter(delay => delay.id === id);
  if (!matched.length) {
    return null;
  }
  return matched[0];
}

const delays = store => next => action => {
  switch (action.type) {
    case 'EDIT_DELAY':
      let delay = findDelay(action.id, store);
      return next({
        type: action.type,
        props: delay,
      });
    default:
      return next(action);
  }
}

export default delays;
