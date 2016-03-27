import { createAction, handleAction, handleActions } from 'redux-actions';
import { UPLOAD_FILES_URL } from '../lib/apiUrl';

export const REQUEST_UPLOAD_FILE = 'REQUEST_UPLOAD_FILE';
export const RECEIVE_UPLOAD_FILE_SUCCESS = 'RECEIVE_UPLOAD_FILE_SUCCESS';

//上传文件action
function requestUploadFile(files) {
  return {
    type: REQUEST_UPLOAD_FILE,
    files
  }
}

function receiveUploadFileSuccess(files) {
  return {
    type: RECEIVE_UPLOAD_FILE_SUCCESS,
    files
  }
}

export function uploadFile(files) {
  var MyForm = new FormData();
  for(let i = 0; i < files.length; i ++) {
    MyForm.append('userFiles', files[i]);
  }
  return dispatch => {
    dispatch(requestUploadFile(files));
    fetch(UPLOAD_FILES_URL, {
      method: 'post',
      body: MyForm
    }).then(function(res){
      if(res.ok) {
        res.json().then(data => {
            dispatch(receiveUploadFileSuccess(data.files));
        })
      }
    });
  }
}
