import uuid from 'uuid/v4';

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

function getDelay(id, user) {
  return fetch(`${API_URL}/delay/${id}`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  })
    .then((res) => {
      if (res.status !== 200) {
        throw new Error(res.statusText);
      }
      return res.json();
    });
}

function listDelays(user, next, all = false) {
  // Load existing delays for user
  next({
    type: 'DELAYS_LOADING',
  });
  let query = '';
  if (all) {
    query = '?all';
  }
  fetch(`${API_URL}/delay${query}`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  })
    .then((res) => {
      if (res.status !== 200) {
        const err = new Error(res.statusText);
        err.httpCode = res.status;
        throw err;
      }
      return res.json();
    })
    .then((storedDelays) => {
      next({
        type: 'DELAYS_LOADED',
        delays: storedDelays.map(delay => ({
          ...delay,
          scheduled_departure: new Date(delay.scheduled_departure),
          created_at: new Date(delay.created_at),
          updated_at: new Date(delay.updated_at),
        })),
      });
    }, (err) => {
      if (err.httpCode === 401) {
        // Invalid token, log user out
        next({
          type: 'USER_LOGOUT',
        });
        return;
      }
      next({
        type: 'DELAYS_LOAD_ERROR',
        message: err.message,
      });
    });
}

const delays = store => next => (action) => {
  switch (action.type) {
    case 'EDIT_DELAY': {
      if (!action.parent) {
        const delay = findDelay(action.id, store);
        next({
          type: action.type,
          props: delay,
        });
        return;
      }

      const { user } = store.getState();
      fetch(`${API_URL}/delay/${action.id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((res) => {
          if (res.status !== 200) {
            throw new Error(res.statusText);
          }
          return res.text();
        })
        .then((currentDelay) => {
          const normalizedDelay = {
            ...currentDelay,
            scheduled_departure: new Date(currentDelay.scheduled_departure),
          };
          next({
            ...action,
            props: normalizedDelay,
          });
        }, (err) => {
          next({
            type: 'DELAYS_LOAD_ERROR',
            message: err.message,
          });
        });
      return;
    }
    case 'ONEPLUS_DELAY': {
      const delay = findDelay(action.id, store);
      const { user } = store.getState();
      next({
        type: action.type,
        props: delay,
        user,
      });
      return;
    }
    case 'SAVE_DELAY': {
      next({
        type: 'SAVING_DELAY',
      });
      const { user } = store.getState();
      if (!user.token) {
        next({
          type: 'SAVE_DELAY_ERROR',
          message: 'Must be logged in',
        });
        return;
      }
      const delay = {
        ...action.props,
        id: action.props.id || uuid(),
      };
      fetch(`${API_URL}/delay`, {
        body: JSON.stringify(delay),
        headers: {
          Authorization: `Bearer ${user.token}`,
          'content-type': 'application/json',
        },
        method: 'POST',
      })
        .then((res) => {
          if (res.status !== 202) {
            throw new Error(res.statusText);
          }
          return res.text();
        })
        .then(() => {
          if (!delay.parent) {
            return next({
              ...action,
              props: delay,
            });
          }
          return getDelay(delay.parent, user)
            .then(parentDelay => next({
              ...action,
              props: {
                ...parentDelay,
                scheduled_departure: new Date(parentDelay.scheduled_departure),
              },
            }));
        }, (err) => {
          next({
            type: 'SAVE_DELAY_ERROR',
            message: err.message,
          });
        });
      return;
    }
    case 'DELETE_DELAY': {
      next({
        type: 'DELETING_DELAY',
      });
      const { user } = store.getState();
      if (!user.token) {
        next({
          type: 'DELETE_DELAY_ERROR',
          message: 'Must be logged in',
        });
        return;
      }
      fetch(`${API_URL}/delay/${action.id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        method: 'DELETE',
      })
        .then((res) => {
          if (res.status !== 204) {
            throw new Error(res.statusText);
          }
          return res.text();
        })
        .then(() => {
          next(action);
        }, (err) => {
          next({
            type: 'DELETE_DELAY_ERROR',
            message: err.message,
          });
        });
      return;
    }
    case 'LIST_DELAYS': {
      const { user } = store.getState();
      next(action);
      listDelays(user, next, action.all);
      return;
    }
    case 'USER_LOGIN': {
      next(action);
      // Load existing delays for user
      listDelays(action, next, action.all);
      return;
    }
    default: {
      next(action);
    }
  }
};

export default delays;
