import { setBoardData } from '../../reducers/board.reducer';
import { fetchData } from '../../api';
import { getDocuments } from '../../firebase';

const makeRecentList = data => {
  let result = [];
  let lastView = localStorage.getItem('lastView');
  if (lastView !== null && JSON.parse(lastView).length > 0) {
    let arr = [];
    JSON.parse(lastView).forEach(el => {
      if (!arr.includes(parseInt(el))) {
        arr.push(parseInt(el));
      }
    });
    let boards = arr
      .map(element => {
        return data.filter(e => parseInt(e.id) === element)[0];
      })
      .filter(el => el);
    result = boards;
  } else {
    result = [];
  }
  return result;
};
//서버로부터 board 데이터 받아옴.
export const getBoard = async dispatch => {
  dispatch(setBoardData({ loading: true }));
  let [data, code, error] = await fetchData('/board/self');
  console.log(data);
  if (error) {
    alert(error);
  } else {
    getDocuments(data);
    let recentBoard = makeRecentList(data);

    let payload = {
      loading: false,
      boardlist: data,
      code: code,
      error: error,
      recentBoard: recentBoard,
    };

    dispatch(setBoardData(payload));
  }
};
