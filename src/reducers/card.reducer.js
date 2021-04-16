import { createAction, handleActions } from 'redux-actions';
import setState from './reduxUtils';

const SETSTATE = '/card/SETSTATE';

export const setData = createAction(SETSTATE);

const initialState = {
  loading: false,
  axiosStatus: false,
  taglist: [],
  cardlist: {},
  checklist: {},
  labellist: [],
  cardlabels: {},
  eventlogs: [],
  cardeventlogs: {},
  currentBoardId: '',
  currentBoardUrl: '',
  currentTagName: '',
  currentCardId: '',
};

const card = handleActions(
  {
    [SETSTATE]: setState,
  },
  initialState,
);
export default card;
