import { useSelector, useDispatch } from 'react-redux';
import getData from '../api/getAPI';
import List from '../components/board/List';
import { get } from '../reducers/board.reducer';

const BoardContainer = ({ match }) => {
  const data = useSelector(state => state.board);

  const dispatch = useDispatch();

  const getBoard = async () => {
    let { board, code, loading, error } = await getData('/boards');
    console.log('dispatch');
    console.log(board, code, loading, error);
    let payload = {
      data: board ? board : [],
      code: code ? code : 0,
      loading: loading ? loading : false,
      error: error ? error : '',
    };

    dispatch(get(payload));
  };

  return <List boardlist={data} getBoard={getBoard} match={match} />;
};
export default BoardContainer;
