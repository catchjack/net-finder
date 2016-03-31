import { createAction, handleAction, handleActions } from 'redux-actions';
import { REQUEST_MUSIC_LIST, RECEIVE_MUSIC_LIST_SUCCESS } from '../actions/getMusic';

export const menu = handleActions({
  RECEIVE_MUSIC_LIST_SUCCESS: (state, action) => ({
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
