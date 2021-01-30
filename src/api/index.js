import { useState, useEffect } from 'react';
import axios from 'axios';

const serverUrl = 'https://hyuki.app/api/v1';

const setAccessToken = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
const clearStorage = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('loginStatus');
};
//GET--------------------------------------------------------------------------------
const useGetApi = (method, uri, state1, history) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState('loading');
  const [code, setCode] = useState(0);
  // setAccessToken(localStorage.getItem('accessToken'));

  useEffect(() => {
    const getData = async () => {
      try {
        let { data } = await axios[method](serverUrl + uri);
        console.log(data);
        if (data.result_body) {
          setData(data.result_body);
        }
        setCode(data.result_code);
        setLoading('finished');
      } catch (err) {
        // console.log('get!');
        console.log(err);
        alert(err);
        clearStorage();
        history.push('/');
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
//TOKEN----------------------------------------------
const getRefreshToken = async token => {
  setAccessToken(token);
  let { data } = await axios.post('https://hyuki.app/oauth2/refresh');
  console.log('getRefreshToken: ', data);
  if (data !== undefined) {
    if (data.result_code >= 401001) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.setItem('loginStatus', false);
      return 401;
    } else if (data.result_code === 200) {
      localStorage.setItem('accessToken', data.result_body.accessToken);
      localStorage.setItem('refreshToken', data.result_body.refreshToken);
      localStorage.setItem('loginStatus', true);
      setAccessToken(localStorage.accessToken);

      return 200;
    } else {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.setItem('loginStatus', false);
      return data.result_message;
    }
  } else {
    return 404;
  }
};

const initializeUser = async () => {
  console.log('initializeUser method');

  let refreshToken = localStorage.getItem('refreshToken');
  // console.log('refreshToken: ', refreshToken);
  if (refreshToken !== null) {
    let code = await getRefreshToken(refreshToken);
    console.log(code);
    if (code === 200) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export {
  useGetApi,
  useGetCardApi,
  usePostApi,
  useUpdateApi,
  useDeleteApi,
  setAccessToken,
  getRefreshToken,
  initializeUser,
};
