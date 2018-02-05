import { combineReducers } from 'redux';
import currentDelay from './currentDelay';
import delays from './delays';
import view from './view';

const fluxFail = combineReducers({
  currentDelay,
  delays,
  view,
});

export default fluxFail;
