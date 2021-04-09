import axios from 'axios';

import { setAccessToken } from './index';
const serverUrl = 'https://hyuki.app/api/v1';
const postData = async (uri, body) => {
  try {
    setAccessToken(localStorage.getItem('accessToken'));

    let { data } = await axios.post(serverUrl + uri, body);
    // console.log(data);
    return [data.result_body ? data.result_body : null, data.result_code];

    // return data.result_code;
  } catch (err) {
    console.log(err);
    return err.response.data.result_code;
  }
};

export default postData;
