import { createAction, handleAction, handleActions } from 'redux-actions';
import { REQUEST_LOGIN, RECEIVE_LOGIN_SUCCESS, RECEIVE_LOGIN_FAIL } from '../actions/login';

export const login = handleActions({
  REQUEST_LOGIN: (state, action) => ({
    ...state,
    isLogining: true
  }),
  RECEIVE_LOGIN_SUCCESS: (state, action) => ({
    ...state,
    isLogining: false,
    isLogin: true,
    user: action.payload
  }),
  RECEIVE_LOGIN_FAIL: (state, action) => ({
    ...state,
    isLogining: false,
  })
}, {
  isLogining: false,
  isLogouting: false,
  isLogin: false,
  user: {}
})
