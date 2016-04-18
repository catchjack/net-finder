import { createAction, handleAction, handleActions } from 'redux-actions';
import { GET_PICTURE_ALL_URL } from '../lib/apiUrl';

export const REQUEST_PICTURE_LIST = 'REQUEST_PICTURE_LIST';
export const RECEIVE_PICTURE_LIST_SUCCESS = 'RECEIVE_PICTURE_LIST_SUCCESS';

const requestPictureList = createAction(REQUEST_PICTURE_LIST);
const receivePictureListSuccess = createAction(RECEIVE_PICTURE_LIST_SUCCESS);

export function fetchMusicList() {
  return (dispatch) => {
    dispatch(requestPictureList());
    return fetch(GET_PICTURE_ALL_URL).then(function(res){
       if(res.ok) {
         return res.json().then(function(data) {
           dispatch(receivePictureListSuccess(data));
           return Promise.resolve(data);
         });
       }
     })
  }
}
