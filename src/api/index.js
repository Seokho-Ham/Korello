import axios from 'axios';

const serverUrl = 'http://222.117.225.28:8080/api/v1';

const apiHelper = async (uri, method) => {
  try {
    let data = await axios[method](serverUrl + uri);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export default apiHelper;
