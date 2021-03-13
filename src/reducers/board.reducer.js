import { createAction, handleActions } from 'redux-actions';
import setState from './reduxUtils';
//action types

const SETSTATE = '/boards/SETSTATE';
//createAction(action maker)

export const setData = createAction(SETSTATE);
//initialState
const initialState = {
  loading: false,
  data: [],
  code: 0,
  recentBoard: [],
  boardTitle: '',
};

//handleActions(Reducer)
const board = handleActions(
  {
    [SETSTATE]: setState,
  },
  initialState,
);

export default board;
