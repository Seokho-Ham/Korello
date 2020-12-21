import { useState, useEffect } from 'react';
import axios from 'axios';

const serverUrl = 'http://222.117.225.28:8080/api/v1';

const useGetApi = (method, uri) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState('loading');
  const [code, setCode] = useState(0);

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
  }, [data]);
  return [data, code, loading];
};

const usePostApi = (uri, body) => {
  const postData = async () => {
    try {
      let { data } = await axios.post(serverUrl + uri, body);
      return data.result_code;
    } catch (err) {
      console.log(err);
    }
  };

  return [postData];
};

export { useGetApi, usePostApi };
