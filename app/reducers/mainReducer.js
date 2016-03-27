import { combineReducers } from 'redux';

import { allFile } from './allFileReducer';
import { music } from './musicReducer';

const rootReducer = combineReducers({
  allFile,
  music
})

export default rootReducer;
