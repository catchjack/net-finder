import { createAction, handleAction, handleActions } from 'redux-actions';

export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const RECEIVE_LOGIN_SUCCESS = 'RECEIVE_LOGIN_SUCCESS';
export const RECEIVE_LOGIN_FAIL = 'RECEIVE_LOGIN_FAIL';

const requestLogin = createAction(REQUEST_LOGIN);
const receiveLoginSuccess = createAction(RECEIVE_LOGIN_SUCCESS);
const receiveLoginFail = createAction(RECEIVE_LOGIN_FAIL);

export function postLogin(data) {
  return (dispatch) => {
    dispatch(requestLogin(data));
    dispatch(receiveLoginSuccess({ name: 'wenjie'}));
  }
}
