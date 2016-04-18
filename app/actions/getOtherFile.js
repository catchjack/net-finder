import { createAction, handleAction, handleActions } from 'redux-actions';
import { GET_OTHER_FILE_URL } from '../lib/apiUrl';

export const REQUEST_OTHER_FILE_LIST = 'REQUEST_OTHER_FILE_LIST';
export const RECEIVE_OTHER_FILE_LIST_SUCCESS = 'RECEIVE_OTHER_FILE_LIST_SUCCESS';

const requestOtherFileList = createAction(REQUEST_OTHER_FILE_LIST);
const receiveOtherFileListSuccess = createAction(RECEIVE_OTHER_FILE_LIST_SUCCESS);

export function fetchOtherFileList() {
  return (dispatch) => {
    dispatch(requestOtherFileList());
    return fetch(GET_OTHER_FILE_URL).then(function(res){
       if(res.ok) {
         return res.json().then(function(data) {
           dispatch(receiveOtherFileListSuccess(data));
           return Promise.resolve(data);
         });
       }
     })
  }
}
