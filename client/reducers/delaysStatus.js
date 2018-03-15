const delaysStatus = (state = 'ok', action) => {
  switch (action.type) {
    case 'DELAYS_LOADING': {
      return 'loading';
    }
    case 'DELAYS_LOADED': {
      return 'ok';
    }
    case 'DELAYS_LOAD_ERROR': {
      return 'error';
    }
    case 'SAVING_DELAY': {
      return 'ok';
    }
    case 'SAVE_DELAY': {
      return 'ok';
    }
    case 'SAVE_DELAY_ERROR': {
      return 'error';
    }
    default: {
      return state;
    }
  }
};

export default delaysStatus;
