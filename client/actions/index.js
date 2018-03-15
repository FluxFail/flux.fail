export const userLogout = () => ({
  type: 'USER_LOGOUT',
});

export const addDelay = () => ({
  type: 'ADD_DELAY',
  date: new Date(),
});

export const cancelDelay = () => ({
  type: 'CANCEL_DELAY',
});

export const saveDelay = props => ({
  type: 'SAVE_DELAY',
  props,
});

export const editDelay = id => ({
  type: 'EDIT_DELAY',
  id,
});

export const deleteDelay = id => ({
  type: 'DELETE_DELAY',
  id,
});

export const navigate = target => ({
  type: 'NAVIGATE_TO',
  target,
});

export const initialize = () => ({
  type: 'INITIALIZE',
});
