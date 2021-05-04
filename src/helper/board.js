import { boardActions } from '../reducers/board.reducer';
import { fetchData } from '../api';
import { setFirebaseDocuments } from '../firebase';
import { userActions } from '../reducers/user.reducer';

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
  const [boardlist, boardError] = await fetchData('/board/self');
  const [userInfo, infoError] = await fetchData('/member/self');

  if (boardError || infoError) {
    alert(boardError ? boardError : infoError);
  } else {
    //firebase에 해당 보드가 없을 경우 추가해주는 함수
    setFirebaseDocuments(boardlist);
    let recentBoard = makeRecentList(boardlist);

    let payload = {
      loading: false,
      error: boardError,
      boardlist,
      recentBoard,
    };
    dispatch(userActions.setUserInfo(userInfo));
    dispatch(boardActions.setBoardData(payload));
  }
};
