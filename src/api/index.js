import { useState, useEffect } from 'react';
import axios from 'axios';

const serverUrl = 'http://222.117.225.28:8080/api/v1';

const apiHandler = async (method, uri, body) => {
  try {
    const { data } = await axios[method](serverUrl + uri, body);

    if (data) {
      return data;
    }
  } catch (err) {
    console.log(err);
  }
};

export default apiHandler;

// const useApi = (method, uri, body) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState('loading');
//   const [code, setCode] = useState(0);

//   useEffect(() => {
//     const getData = async () => {
//       try {
//         let { data } = await axios[method](serverUrl + uri, body);
//         if (data.result_body) {
//           setData(data.result_body);
//         }
//         setCode(data.result_code);
//         setLoading('finished');
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getData();
//   }, []);
//   return [data, code, loading];
// };

// export default useApi;
