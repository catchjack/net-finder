import { combineReducers } from 'redux';

import { allFile } from './allFileReducer';
import { music } from './musicReducer';
import { login } from './loginReducer';
import { otherFile } from './otherFileReducer';

const rootReducer = combineReducers({
  allFile,
  music,
  login,
  otherFile
})

export default rootReducer;
