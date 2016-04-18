import { createAction, handleAction, handleActions } from 'redux-actions';
import { REQUEST_OTHER_FILE_LIST, RECEIVE_OTHER_FILE_LIST_SUCCESS } from '../actions/getOtherFile';

export const otherFile = handleActions({
  RECEIVE_OTHER_FILE_LIST_SUCCESS: (state, action) => ({
    ...state,
    items: action.payload
  })
},{
  isFetching: false,
  lastUpdated: Date.now(),
  isDeleteing: false,
  didInvalidate: true,
  items: []
})
