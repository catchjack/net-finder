import { combineReducers } from 'redux';

import { allFile } from './allFileReducer';
import { music } from './musicReducer';
import { login } from './loginReducer';

const rootReducer = combineReducers({
  allFile,
  music,
  login
})

export default rootReducer;
