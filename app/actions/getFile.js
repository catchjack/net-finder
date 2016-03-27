import { createAction, handleAction, handleActions } from 'redux-actions';
import { GET_FILE_ALL_URL } from '../lib/apiUrl';

export const GET_FILE_LIST = 'GET_FILE_LIST';
export const UPDATE_FILE_LIST = 'UPDATE_FILE_LIST';

export const REQUEST_FILE_LIST = 'REQUEST_FILE_LIST';
export const RECEIVE_FILE_LIST_SUCCESS = 'RECEIVE_FILE_LIST_SUCCESS';
export const SELECT_FILE_TYPE = 'SELECT_FILE_TYPE';


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
