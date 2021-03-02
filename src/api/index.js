import axios from 'axios';
import { fetchData, fetchCard } from './getAPI';
import postData from './postAPI';
import updateData from './updateAPI';
import deleteData from './deleteAPI';

const setAccessToken = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
const clearStorage = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.setItem('loginStatus', false);
};
//REFRESH TOKEN--------------------------------------------------------------------------------
const getRefreshToken = async () => {
  setAccessToken(localStorage.getItem('refreshToken'));
  let { data } = await axios.post('https://hyuki.app/oauth2/refresh');

  if (data !== undefined) {
    if (data.result_code >= 401001) {
      if (data.result_code === 401001) {
        alert('토큰이 만료됨!');
      }
      if (data.result_code === 401002) {
        alert('토큰이 유효하지 않음');
      }
      if (data.result_code === 401003) {
        alert('토큰이 없음!');
      }
      return 401;
    } else if (data.result_code === 200) {
      localStorage.setItem('accessToken', data.result_body.access_token);
      localStorage.setItem('refreshToken', data.result_body.refresh_token);
      localStorage.setItem('loginStatus', true);
      return 200;
    } else {
      alert(data.result_message);
      clearStorage();
      return data.result_message;
    }
  } else {
    return 404;
  }
};

export {
  setAccessToken,
  clearStorage,
  getRefreshToken,
  fetchData,
  fetchCard,
  postData,
  updateData,
  deleteData,
};
