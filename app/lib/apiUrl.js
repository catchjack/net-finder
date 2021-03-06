'use strict';

import {host}  from './setting.js';

export const GET_FILE_ALL_URL = host+'get';
export const GET_MUSIC_ALL_URL = host+'get?type=music';
export const GET_PICTURE_ALL_URL = host+'get?type=picture';
export const GET_OTHER_FILE_URL = host+'get?type=other';
export const DELETE_FILES_URL = host+'files';
export const UPLOAD_FILES_URL = host+'upload';
