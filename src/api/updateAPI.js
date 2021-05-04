import axios from 'axios';
import { setAccessToken } from './index';
const serverUrl = 'https://hyuki.app/api/v1';
const updateData = async (url, body) => {
  setAccessToken(localStorage.getItem('accessToken'));
  try {
    const { data } = await axios.put(serverUrl + url, body);

    return [data.result_body ? data.result_body : null, data.result_code, null];
  } catch (err) {
    return [null, err.response.data.result_code, err];
  }
};

export default updateData;
