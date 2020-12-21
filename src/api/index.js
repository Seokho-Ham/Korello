import { useState, useEffect } from 'react';
import axios from 'axios';

const serverUrl = 'http://222.117.225.28:8080/api/v1';

//GET--------------------------------------------------------------------------------
const useGetApi = (method, uri, state1, state2) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState('loading');
  const [code, setCode] = useState(0);

  useEffect(() => {
    const getData = async () => {
      try {
        let { data } = await axios[method](serverUrl + uri);
        console.log('get요청');
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
  }, [state1, state2]);
  return [data, code, loading];
};

const useGetCardApi = uri => {
  const [update, setUpdate] = useState(false);
  const [tagList, setTagList] = useState([]);
  const [cardList, setCardList] = useState([]);

  useEffect(() => {
    const getCard = async () => {
      let { data } = await axios.get(serverUrl + uri);
      console.log('getCard 요청');
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
      console.log('post 요청');

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
      console.log('update 요청');
      if (data) {
        return data.result_code;
      }
    } catch (err) {
      console.log(err);
    }
  };
  return [updateData];
};

export { useGetApi, useGetCardApi, usePostApi, useUpdateApi };
