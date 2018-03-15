import { combineReducers } from 'redux';
import delays from './delays';
import view from './view';
import user from './user';

const fluxFail = combineReducers({
  delays,
  view,
  user,
});

export default fluxFail;
