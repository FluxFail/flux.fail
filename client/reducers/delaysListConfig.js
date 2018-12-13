
const delaysListConfig = (state = {
  all: false,
}, action) => {
  switch (action.type) {
    case 'LIST_DELAYS': {
      return {
        ...state,
        all: action.all,
      };
    }
    default: {
      return state;
    }
  }
};

export default delaysListConfig;
