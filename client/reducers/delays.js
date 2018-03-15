import { combineReducers } from 'redux';
import status from './delaysStatus';
import current from './delaysCurrent';
import reported from './delaysReported';

const delays = combineReducers({
  status,
  current,
  reported,
});

export default delays;
