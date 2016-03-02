import {
  GET_FILE_LIST, UPDATE_FILE_LIST,
  REQUEST_FILE_LIST, RECEIVE_FILE_LIST_SUCCESS,
  SELECT_FILE_TYPE,
  REQUEST_DELETE_FILE, RECEIVE_DELETE_FILE_SUCCESS,
  REQUEST_UPLOAD_FILE, RECEIVE_UPLOAD_FILE_SUCCESS
} from './actionTypes.js';

import {
  GET_FILE_ALL_URL, DELETE_FILES_URL, UPLOAD_FILES_URL
} from '../lib/apiUrl'

import { fileTypeHash , fileTypeToDbType} from '../lib/fileType';

export function getFileList(){
  return {
    type: GET_FILE_LIST
  }
}

export function updateFileList(files){
  return {
    type: UPDATE_FILE_LIST,
    files
  }
}

export function selectFileType(fileType){
  return {
    type:SELECT_FILE_TYPE,
    fileType
  }
}

function requestFileList() {
  return  {
    type: REQUEST_FILE_LIST,
  }
}

function receiveFileListSuccess(files) {
  return {
    type: RECEIVE_FILE_LIST_SUCCESS,
    files: files,
    receivedAt: Date.now()
  }
}

export function fetchFileList() {
  return function(dispatch, getState) {
    dispatch(requestFileList());
    return fetch(GET_FILE_ALL_URL).then(function(res){
       if(res.ok) {
         res.json().then(function(data) {
           dispatch(receiveFileListSuccess(data))
         });
       }
     })

  }
}

function shouldFetchFileList(state) {
  const files = state.allFile;
  if (!files) {
    return true
  } else if (files.isFetching) {
    return false
  } else {
    return files.didInvalidate
  }
}

export function fetchFileListIfNeeded() {

  // 注意这个函数也接收了 getState() 方法
  // 它让你选择接下来 dispatch 什么。

  // 当缓存的值是可用时，
  // 减少网络请求很有用。

  return (dispatch, getState) => {
    if (shouldFetchFileList(getState())) {
      // 在 thunk 里 dispatch 另一个 thunk！
      return dispatch(fetchFileList())
    } else {
      // 告诉调用代码不需要再等待。
      return Promise.resolve()
    }
  }
}

export function selectFileTypeAndUpdate() {
  return (dispatch) => {
    dispatch(selectFileType());
    dispatch(fetchFileListIfNeeded());
  }
}

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
