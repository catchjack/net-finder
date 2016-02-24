import { combineReducers } from 'redux';
import {
  GET_FILE_LIST, REQUEST_FILE_LIST,
  RECEIVE_FILE_LIST_SUCCESS, SELECT_FILE_TYPE,
  REQUEST_DELETE_FILE, RECEIVE_DELETE_FILE_SUCCESS
} from './actionTypes';

//
// function selectedType(state = 'all', action) {
//   switch (action.type) {
//     case SELECT_FILE_TYPE:
//       return action.fileType;
//     default:
//       return state;
//   }
// }
//
// function files(state = {
//   isFetching: false,
//   isDeleteing: false,
//   lastUpdated: Date.now(),
//   didInvalidate: true,
//   items: []
// }, action) {
//   switch (action.type) {
//     case REQUEST_FILE_LIST:
//       return Object.assign({}, state, {
//         isFetching: true
//       })
//     case RECEIVE_FILE_LIST_SUCCESS:
//       return Object.assign({}, state, {
//         isFetching: false,
//         lastUpdated: action.receivedAt,
//         didInvalidate: false,
//         items: action.files
//       })
//     case RECEIVE_DELETE_FILE_SUCCESS:
//       return Object.assign({}, state, {
//         items: state.items.filter(item => {
//           return action.ids.indexOf(item._id) < 0;
//         })
//       });
//     default:
//       return state;
//
//   }
// }
//
// function filesByType(state = {
//   all: {
//     isFetching: false,
//     lastUpdated: Date.now(),
//     didInvalidate: true,
//     items: []
//   },
//   picture: {
//     isFetching: false,
//     lastUpdated: Date.now(),
//     didInvalidate: true,
//     items: []
//   },
//   music: {
//     isFetching: false,
//     lastUpdated: Date.now(),
//     didInvalidate: true,
//     items: []
//   },
//   other: {
//     isFetching: false,
//     lastUpdated: Date.now(),
//     didInvalidate: true,
//     items: []
//   }
// }, action) {
//   switch (action.type) {
//     case REQUEST_FILE_LIST:
//     case RECEIVE_FILE_LIST_SUCCESS:
//     case REQUEST_DELETE_FILE:
//     case RECEIVE_DELETE_FILE_SUCCESS:
//       return Object.assign({}, state, {
//         [action.fileType]: files(state[action.fileType], action)
//       })
//     default:
//       return state
//   }
// }

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
    default:
      return state;

  }
}

const rootReducer = combineReducers({
  allFile
})


export default rootReducer;
