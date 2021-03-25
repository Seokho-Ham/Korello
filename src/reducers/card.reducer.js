import { createAction, handleActions } from 'redux-actions';
import setState from './reduxUtils';

const SETSTATE = '/card/SETSTATE';

export const setData = createAction(SETSTATE);

const initialState = {
  loading: false,
  taglist: [],
  cardlist: [],
  checklist: {},
  labellist: [],
  cardlabels: {},
  currentBoardId: '',
  currentBoardUrl: '',
  currentCardId: '',
  axiosStatus: false,
};

const card = handleActions(
  {
    [SETSTATE]: setState,
  },
  initialState,
);
export default card;
