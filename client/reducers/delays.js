import { combineReducers } from 'redux';
import status from './delaysStatus';
import current from './delaysCurrent';
import reported from './delaysReported';
import listConfig from './delaysListConfig';

const delays = combineReducers({
  status,
  current,
  reported,
  listConfig,
});

export default delays;
