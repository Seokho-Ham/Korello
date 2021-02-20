import axios from 'axios';
import { getRefreshToken, clearStorage, setAccessToken } from './index';
const serverUrl = 'https://hyuki.app/api/v1';

const fetchData = async uri => {
  setAccessToken(localStorage.getItem('accessToken'));
  try {
    let { data } = await axios.get(serverUrl + uri);
    if (data.result_body) {
      // console.log('rawdata: ', data.result_body);
      return [data.result_body, data.result_code];
    }
  } catch (err) {
    if (err.response) {
      if (err.response.data.result_code >= 401001) {
        // console.log(err.response.data.result_code);
        let code = await getRefreshToken();
        if (code === 200) {
          // error = err;
          return await fetchData(uri);
        } else {
          console.log('error', err);
          clearStorage();
          alert('다시 로그인 해주세요!');
          window.location.reload();
        }
      } else {
        console.log('error-response: ', err.response);
        clearStorage();
        alert('다시 로그인 해주세요!');
        window.location.reload();
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
const fetchCard = async uri => {
  setAccessToken(localStorage.getItem('accessToken'));
  try {
    let { data } = await axios.get(serverUrl + uri);

    let { result_body, result_code } = data;
    // console.log('raw data: ', result_body);
    if (result_body && result_body.length > 0) {
      const obj = {};
      const tags = [];
      const cards = [];
      result_body
        // .sort((a, b) => a.id - b.id)
        .forEach(el => {
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
      // console.log('tags: ', tags);
      // console.log('cards: ', cards);
      return [tags, cards, result_code];
    } else {
      return [[], [], result_code];
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
        clearStorage();
        alert('다시 로그인 해주세요!');
        window.location.reload();
      }
    } else if (err.request) {
      console.log('error-request: ', err.request);
    } else {
      console.log('error: ', err);
      return {};
    }
  }
};

export { fetchData, fetchCard };
