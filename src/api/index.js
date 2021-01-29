import { useState, useEffect } from 'react';
import axios from 'axios';

const serverUrl = 'https://hyuki.app';
let accessToken = '';

const setAccessToken = token => {
  // console.log(token);
  accessToken = token;
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
};

//GET--------------------------------------------------------------------------------
const useGetApi = (method, uri, state1, state2) => {
  console.log('gkgk');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState('loading');
  const [code, setCode] = useState(0);
  setAccessToken(localStorage.getItem('accessToken'));
  useEffect(() => {
    const getData = async () => {
      try {
        let { data } = await axios[method](serverUrl + uri);

        if (data.result_body) {
          setData(data.result_body);
        }
        setCode(data.result_code);
        setLoading('finished');
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [state1]);
  return [data, code, loading];
};

const useGetCardApi = uri => {
  const [update, setUpdate] = useState(false);
  const [tagList, setTagList] = useState([]);
  const [cardList, setCardList] = useState([]);

  useEffect(() => {
    const getCard = async () => {
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

        setTagList(tags);
        setCardList(cards);
      } else {
        setTagList([]);
        setCardList([]);
      }
    };
    getCard();
  }, [update]);

  return [tagList, cardList, setUpdate];
};

//POST--------------------------------------------------------------------------------
const usePostApi = () => {
  const postData = async (uri, body) => {
    try {
      let { data } = await axios.post(serverUrl + uri, body);

      return data.result_code;
    } catch (err) {
      console.log(err);
    }
  };

  return [postData];
};

const getRefreshToken = async () => {
  let refresh = localStorage.getItem('refreshToken');
  setAccessToken(refresh);
  let { result_code, result_message, result_body } = await axios.get(
    serverUrl + '/oauth2/refresh',
  ).data;
  if (
    result_code === 401001 ||
    result_code === 401002 ||
    result_code === 401003
  ) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.setItem('loginStatus', false);
    return 401;
  } else if (result_code === 200) {
    localStorage.setItem('accessToken', result_body.accessToken);
    localStorage.setItem('refreshToken', result_body.refreshToken);
    localStorage.setItem('loginStatus', true);
    setAccessToken(result_body.accessToken);
    return 200;
  } else {
    return result_message;
  }
};

//UPDATE--------------------------------------------------------------------------------
const useUpdateApi = () => {
  const updateData = async (url, body) => {
    try {
      const { data } = await axios.put(serverUrl + url, body);

      if (data) {
        return data.result_code;
      }
    } catch (err) {
      console.log(err);
    }
  };
  return [updateData];
};

//DELETE-------------------------------------------------------------------------------
const useDeleteApi = () => {
  const deleteData = async url => {
    try {
      const { data } = await axios.delete(serverUrl + url);

      if (data) {
        return data.result_code;
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  };
  return [deleteData];
};

export {
  useGetApi,
  useGetCardApi,
  usePostApi,
  useUpdateApi,
  useDeleteApi,
  setAccessToken,
  accessToken,
  getRefreshToken,
};
