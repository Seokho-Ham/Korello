import { createAction, handleActions } from 'redux-actions';
import setState from './reduxUtils';
//action types

const SETSTATE = '/boards/SETSTATE';
const START_REQUEST = 'boards/START_REQUEST';
const END_REQUEST = 'boards/END_REQUEST';
//createAction(action maker)
export const boardActions = {
  setBoardData: createAction(SETSTATE),
  startRequest: createAction(START_REQUEST),
  endRequest: createAction(END_REQUEST),
};
// export const setBoardData = createAction(SETSTATE);
//initialState
const initialState = {
  loading: false,
  error: null,
  boardlist: [],
  recentBoard: [],
  code: 0,
};

//handleActions(Reducer)
const board = handleActions(
  {
    [SETSTATE]: setState,
    [START_REQUEST]: state => {
      return {
        ...state,
        loading: true,
      };
    },
    [END_REQUEST]: state => {
      return {
        ...state,
        loading: false,
      };
    },
  },
  initialState,
);

export default board;
