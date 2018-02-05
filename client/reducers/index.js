import { combineReducers } from 'redux';
import currentDelay from './currentDelay';
import delays from './delays';
import view from './view';
import user from './user';

const fluxFail = combineReducers({
  currentDelay,
  delays,
  view,
  user,
});

export default fluxFail;
