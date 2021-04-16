import axios from 'axios';

import { getRefreshToken, clearStorage, setAccessToken } from './index';
const serverUrl = 'https://hyuki.app/api/v1';
const eventUrl = 'https://hyuki.app/api/v2';

const fetchData = async uri => {
  setAccessToken(localStorage.getItem('accessToken'));
  try {
    let { data } = await axios.get(serverUrl + uri);

    if (data.result_body) {
      return [data.result_body, data.result_code, undefined];
    }
  } catch (err) {
    if (err.response) {
      if (err.response.data.result_code >= 401001) {
        let code = await getRefreshToken();
        if (code === 200) {
          return await fetchData(uri);
        } else {
          console.log('error', err);
          clearStorage();
          alert('다시 로그인 해주세요!');
          window.location.reload();
        }
      } else {
        console.log('error-response: ', err.response);
        return [[], 404, err];
      }
    } else {
      return [[], 404, err];
    }
  }
};
//GETCARD----------------------------------------
const fetchCard = async uri => {
  setAccessToken(localStorage.getItem('accessToken'));
  try {
    let { data } = await axios.get(serverUrl + uri);
    let { result_body, result_code } = data;

    if (result_body && result_body.length > 0) {
      return [result_body, result_code];
    } else {
      return [[], result_code];
    }
  } catch (err) {
    if (err.response) {
      if (err.response.data.result_code === 401001) {
        console.log(err.response.data.result_code);
        let code = await getRefreshToken();
        if (code === 200) {
          return await fetchCard(uri);
        } else {
          clearStorage();
          alert('다시 로그인 해주세요!');
          window.location.reload();
        }
      } else {
        console.log('error-response: ', err.response);
        return [[], 404, err];
      }
    } else {
      console.log('error: ', err);
      return [[], 404, err];
    }
  }
};

const fetchEvents = async uri => {
  setAccessToken(localStorage.getItem('accessToken'));
  try {
    let { data } = await axios.get(eventUrl + uri);

    if (data.result_body) {
      return [data.result_body, data.result_code, undefined];
    }
  } catch (err) {
    if (err.response) {
      if (err.response.data.result_code >= 401001) {
        let code = await getRefreshToken();
        if (code === 200) {
          return await fetchEvents(uri);
        } else {
          console.log('error', err);
          clearStorage();
          alert('다시 로그인 해주세요!');
          window.location.reload();
        }
      } else {
        console.log('error-response: ', err.response);
        return [[], 404, err];
      }
    } else {
      return [[], 404, err];
    }
  }
};

export { fetchData, fetchCard, fetchEvents };
