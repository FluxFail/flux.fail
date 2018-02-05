import { combineReducers } from 'redux';
import currentDelay from './currentDelay';
import delays from './delays';

const fluxFail = combineReducers({
  currentDelay,
  delays,
});

export default fluxFail;
