import { createAction, handleActions } from 'redux-actions';
import setState from './reduxUtils';
//action types

const SETSTATE = '/boards/SETSTATE';
//createAction(action maker)

export const setBoardData = createAction(SETSTATE);
//initialState
const initialState = {
  loading: false,
  boardlist: [],
  code: 0,
  error: null,
  recentBoard: [],
};

//handleActions(Reducer)
const board = handleActions(
  {
    [SETSTATE]: setState,
  },
  initialState,
);

export default board;
