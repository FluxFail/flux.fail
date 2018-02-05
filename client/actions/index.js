export const addDelay = () => {
  return {
    type: 'ADD_DELAY',
    date: new Date(),
  };
};

export const cancelDelay = () => {
  return {
    type: 'CANCEL_DELAY',
  };
};

export const saveDelay = (props) => {
  const action = {
    type: 'SAVE_DELAY',
    props,
  };
  return action;
};

export const editDelay = (id) => {
  return {
    type: 'EDIT_DELAY',
    id,
  };
};

export const deleteDelay = (id) => {
  return {
    type: 'DELETE_DELAY',
    id,
  };
};
