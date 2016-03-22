import { createAction, handleAction, handleActions } from 'redux-actions';
import { GET_MUSIC_ALL_URL } from '../lib/apiUrl';

export const REQUEST_MUSIC_LIST = 'REQUEST_MUSIC_LIST';
export const RECEIVE_MUSIC_LIST_SUCCESS = 'RECEIVE_MUSIC_LIST_SUCCESS';

const requestMusicList = createAction(REQUEST_MUSIC_LIST);
const receiveMusicListSuccess = createAction(RECEIVE_MUSIC_LIST_SUCCESS);

export function fetchMusicList(callback) {
  return (dispatch) => {
    dispatch(requestMusicList());
    return fetch(GET_MUSIC_ALL_URL).then(function(res){
       if(res.ok) {
         res.json().then(function(data) {
           dispatch(receiveMusicListSuccess(data));
           callback();
         });
       }
     })
  }
}
