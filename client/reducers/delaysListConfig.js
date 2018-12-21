
const delaysListConfig = (state = {
  myDelays: false,
}, action) => {
  switch (action.type) {
    case 'LIST_DELAYS': {
      return {
        ...state,
        myDelays: action.myDelays,
      };
    }
    default: {
      return state;
    }
  }
};

export default delaysListConfig;
