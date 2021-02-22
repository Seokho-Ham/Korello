import { get } from '../../reducers/board.reducer';
import { fetchData } from '../../api';

export const getBoard = async dispatch => {
  let [board, code] = await fetchData('/boards');

  let payload = {
    data: board ? board : [],
    code: code ? code : 0,
  };

  dispatch(get(payload));
};
