import axios from 'axios';
import { getRefreshToken, clearStorage, setAccessToken } from './index';
const serverUrl = 'https://hyuki.app/api/v1';

const getData = async uri => {
  setAccessToken(localStorage.getItem('accessToken'));
  try {
    let { data } = await axios.get(serverUrl + uri);
    if (data.result_body) {
      return [data.result_body, data.result_code];
    }
  } catch (err) {
    if (err.response) {
      if (err.response.data.result_code >= 401001) {
        console.log(err.response.data.result_code);
        let code = await getRefreshToken();
        if (code === 200) {
          // error = err;
          return await getData(uri);
        } else {
          console.log('error', err);
          // clearStorage();
          // window.location.reload();
        }
      } else {
        console.log('error-response: ', err.response);
        // clearStorage();
        // window.location.reload();
      }
    } else if (err.request) {
      console.log('error-request: ', err.request);
      return { error: err };
    } else {
      console.log('error: ', err);
      return { error: err };
    }
  }
};
//GETCARD----------------------------------------
const getCardApi = async uri => {
  setAccessToken(localStorage.getItem('accessToken'));
  try {
    let { data } = await axios.get(serverUrl + uri);

    let { result_body } = data;

    if (result_body.length > 0) {
      const obj = {};
      const tags = [];
      const cards = [];
      result_body
        .sort((a, b) => a.id - b.id)
        .map(el => {
          let cardObj = {
            id: el.id,
            name: el.name,
            tagValue: el.tagValue,
            memberNames: el.memberNames,
            labels: el.labels,
            createDate: el.createDate,
            updateDate: el.updateDate,
          };

          if (!obj[el.tagValue]) {
            obj[el.tagValue] = [cardObj];
          } else {
            obj[el.tagValue].push(cardObj);
          }
        });

      for (let i in obj) {
        tags.push(i);
        cards.push(obj[i]);
      }
      return [tags, cards];
    } else {
      return [[], []];
    }
  } catch (err) {
    if (err.response) {
      if (err.response.data.result_code === 401001) {
        console.log(err.response.data.result_code);
        let code = await getRefreshToken();
        if (code === 200) {
          return await getCardApi(uri);
        } else {
          // clearStorage();
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

export { getData, getCardApi };