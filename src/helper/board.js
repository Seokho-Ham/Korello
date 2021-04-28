import { boardActions } from '../reducers/board.reducer';
import { fetchData } from '../api';
import { setFirebaseDocuments } from '../firebase';

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
export const getBoardList = async dispatch => {
  dispatch(boardActions.startRequest());
  let [boardlist, error] = await fetchData('/board/self');

  if (error) {
    alert(error);
  } else {
    //firebase에 해당 보드가 없을 경우 추가해주는 함수
    setFirebaseDocuments(boardlist);
    let recentBoard = makeRecentList(boardlist);

    let payload = {
      loading: false,
      error,
      boardlist,
      recentBoard,
    };

    dispatch(boardActions.setBoardData(payload));
  }
};
