import { setAccessToken } from './index';
import axios from 'axios';
const serverUrl = 'https://hyuki.app/api/v1';

const deleteData = async url => {
  setAccessToken(localStorage.getItem('accessToken'));
  try {
    const { data } = await axios.delete(serverUrl + url);

    if (data) {
      return data.result_code;
    }
  } catch (err) {
    return err.response.data.result_code;
  }
};
export default deleteData;
