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
