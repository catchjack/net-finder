import { createAction, handleAction, handleActions } from 'redux-actions';
import { DELETE_FILES_URL } from '../lib/apiUrl';

export const REQUEST_DELETE_FILE = 'REQUEST_DELETE_FILE';
export const RECEIVE_DELETE_FILE_SUCCESS = 'RECEIVE_DELETE_FILE_SUCCESS';


//删除文件action
function requestDeleteFile( ids) {
  return {
    type: REQUEST_DELETE_FILE,
    ids
  }
}

function receiveDeleteFileSuccess(ids){
  return {
    type: RECEIVE_DELETE_FILE_SUCCESS,
    ids
  }
}

export function deleteFile(ids) {
  let bodyJson = {
    ids: ids
  }
  return (dispatch) => {
    dispatch(requestDeleteFile( ids));
    return fetch(DELETE_FILES_URL, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyJson)
    }).then(res => {
      if(res.ok) {
        dispatch(receiveDeleteFileSuccess(ids));
      }
    })
  }
}
