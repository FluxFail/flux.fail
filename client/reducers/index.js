import { combineReducers } from 'redux';
import currentDelay from './currentDelay';

const fluxFail = combineReducers({
  currentDelay,
});

export default fluxFail;
