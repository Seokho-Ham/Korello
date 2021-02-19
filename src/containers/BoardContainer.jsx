import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from '../api';
import List from '../components/board/List';
import { get } from '../reducers/board.reducer';
export const getBoard = async dispatch => {
  let [board, code] = await fetchData('/boards');

  let payload = {
    data: board ? board : [],
    code: code ? code : 0,
  };

  dispatch(get(payload));
};

const BoardContainer = ({ match }) => {
  const data = useSelector(state => state.board);

  const dispatch = useDispatch();

  useEffect(() => {
    getBoard(dispatch);
  }, []);

  return <List boardlist={data} getBoard={getBoard} match={match} />;
};

export default BoardContainer;
