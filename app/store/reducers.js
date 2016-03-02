import { combineReducers } from 'redux';
import {
  GET_FILE_LIST, REQUEST_FILE_LIST,
  RECEIVE_FILE_LIST_SUCCESS, SELECT_FILE_TYPE,
  REQUEST_DELETE_FILE, RECEIVE_DELETE_FILE_SUCCESS,
  REQUEST_UPLOAD_FILE, RECEIVE_UPLOAD_FILE_SUCCESS
} from './actionTypes';

function allFile(state = {
  isFetching: false,
  lastUpdated: Date.now(),
  isDeleteing: false,
  didInvalidate: true,
  items: []
}, action) {
  switch (action.type) {
    case REQUEST_FILE_LIST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_FILE_LIST_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        lastUpdated: action.receivedAt,
        didInvalidate: false,
        items: action.files
      })
    case REQUEST_DELETE_FILE:
      return Object.assign({}, state, {
        isDeleteing: true
      })
    case RECEIVE_DELETE_FILE_SUCCESS:
      return Object.assign({}, state, {
        isDeleteing: false,
        items: state.items.filter(item => {
          return action.ids.indexOf(item._id) < 0;
        })
      });
    case RECEIVE_UPLOAD_FILE_SUCCESS:
      return Object.assign({}, state, {
        items: [...state.items, ...action.files]
      })
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  allFile
})


export default rootReducer;
