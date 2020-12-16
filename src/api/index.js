import axios from 'axios';

const serverUrl = 'http://222.117.225.28:8080/api/v1';

const apiHelper = async (method, uri, body) => {
  try {
    let data = body
      ? await axios[method](serverUrl + uri, body)
      : await axios[method](serverUrl + uri);

    return data.data;
  } catch (err) {
    console.log(err);
  }
};

export default apiHelper;
