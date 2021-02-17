import axios from 'axios';
import { setAccessToken } from './index';
const serverUrl = 'https://hyuki.app/api/v1';
const updateData = async (url, body) => {
  try {
    setAccessToken(localStorage.getItem('accessToken'));

    const { data } = await axios.put(serverUrl + url, body);

    return data.result_code;
  } catch (err) {
    return err.response.data.result_code;
  }
};

export default updateData;