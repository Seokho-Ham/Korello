import { boardActions } from '../reducers/board.reducer';
import { fetchData } from '../api';
import { setFirebaseDocuments } from '../firebase';

const makeRecentList = data => {
  let result = [];
  let lastView = JSON.parse(localStorage.getItem('lastView'));

  if (lastView !== null && lastView.length) {
    const arr = [];
    lastView.forEach(el => {
      arr.push(parseInt(el));
    });

    result = arr
      .map(element => {
        return data.filter(e => parseInt(e.id) === element)[0];
      })
      .filter(el => el);
  } else {
    result = [];
  }
  return result;
};

//서버로부터 board 데이터 받아옴.
export const getBoardList = async dispatch => {
  dispatch(boardActions.startRequest());
  const [boardlist, boardError] = await fetchData('/board/self');

  if (boardError) {
    alert(boardError);
  } else {
    //firebase에 해당 보드가 없을 경우 추가해주는 함수
    setFirebaseDocuments(boardlist);
    let recentBoard = makeRecentList(boardlist);

    dispatch(
      boardActions.setBoardData({
        loading: false,
        error: boardError,
        boardlist,
        recentBoard,
      }),
    );
  }
};
