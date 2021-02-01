import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const serverUrl = 'https://hyuki.app/api/v1';

const setAccessToken = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
const clearStorage = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.setItem('loginStatus', false);
};
//GET--------------------------------------------------------------------------------
const useGetApi = (method, uri, state1, history) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState('loading');
  const [code, setCode] = useState(0);
  const [recentList, setRecentList] = useState([]);
  setAccessToken(localStorage.getItem('accessToken'));

  useEffect(() => {
    const getData = async () => {
      try {
        console.log('get요청');
        let { data } = await axios[method](serverUrl + uri);
        // console.log(data);
        if (data.result_body) {
          setData(data.result_body);
          let boards = JSON.parse(localStorage.getItem('lastView'))
            .map(element => {
              return data.result_body.filter(e => e.id === element)[0];
            })
            .filter(el => el);

          if (boards === undefined) {
            localStorage.removeItem('lastView');
          } else {
            setRecentList(boards);
          }
        }
        setCode(data.result_code);
        setLoading('finished');
      } catch (err) {
        // console.log('get!');
        console.log(err);
        // alert(err);
        // clearStorage();
        // history.push('/');
      }
    };
    getData();
  }, [state1]);
  return [data, code, loading, recentList];
};

const useGetCardApi = uri => {
  const [update, setUpdate] = useState(false);
  const [tagList, setTagList] = useState([]);
  const [cardList, setCardList] = useState([]);
  setAccessToken(localStorage.getItem('accessToken'));
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
    setAccessToken(localStorage.getItem('accessToken'));
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
    setAccessToken(localStorage.getItem('accessToken'));
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
    setAccessToken(localStorage.getItem('accessToken'));
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

const useInitializeUser = () => {
  const [loginState, setLoginState] = useState(
    Boolean(localStorage.getItem('loginStatus')),
  );

  useEffect(() => {
    let timeout;
    const getRefreshToken = async () => {
      setAccessToken(localStorage.getItem('refreshToken'));
      let { data } = await axios.post('https://hyuki.app/oauth2/refresh');

      if (data !== undefined) {
        if (data.result_code >= 401001) {
          if (data.result_code === 401001) {
            alert('토큰이 만료됨!');
          }
          if (data.result_code === 401002) {
            alert('토큰이 유효하지 않음');
          }
          if (data.result_code === 401003) {
            alert('토큰이 없음!');
          }
          clearStorage();
          setLoginState(false);
          return 401;
        } else if (data.result_code === 200) {
          localStorage.setItem('accessToken', data.result_body.access_token);
          localStorage.setItem('refreshToken', data.result_body.refresh_token);
          localStorage.setItem('loginStatus', true);
          timeout = setTimeout(() => {
            console.log('자동 갱신!');
            getRefreshToken(localStorage.getItem('refreshToken'));
          }, 50000);
          setLoginState(true);
          return 200;
        } else {
          alert(data.result_message);
          clearStorage();
          setLoginState(false);

          return data.result_message;
        }
      } else {
        return 404;
      }
    };
    if (localStorage.getItem('loginStatus') === 'true') {
      getRefreshToken();
    }
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return [loginState];
};

export {
  useGetApi,
  useGetCardApi,
  usePostApi,
  useUpdateApi,
  useDeleteApi,
  setAccessToken,
  // getRefreshToken,
  useInitializeUser,
  clearStorage,
};
