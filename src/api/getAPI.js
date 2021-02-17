import axios from 'axios';
import { getRefreshToken, clearStorage, setAccessToken } from './index';
const serverUrl = 'https://hyuki.app/api/v1';

const getData = async uri => {
  let board = [];
  let code = 0;
  let loading = false;
  let error = '';
  setAccessToken(localStorage.getItem('accessToken'));
  try {
    console.log('get요청');

    loading = false;
    let { data } = await axios.get(serverUrl + uri);
    console.log(data.result_body);
    if (data.result_body) {
      board = data.result_body;
    }

    code = data.result_code;
    loading = false;
    return { board, code, loading };
  } catch (err) {
    if (err.response) {
      if (err.response.data.result_code >= 401001) {
        console.log(err.response.data.result_code);
        let code = await getRefreshToken();
        if (code === 200) {
          error = err;
          return await getData(uri);
        } else {
          // clearStorage();
          return { error: err };

          // window.location.reload();
        }
      } else {
        console.log('error-response: ', err.response);
        // clearStorage();
        // window.location.reload();
      }
    } else if (err.request) {
      console.log('error-request: ', err.request);
    } else {
      console.log('error: ', err);
    }
  }
};

//GETCARD

export default getData;
