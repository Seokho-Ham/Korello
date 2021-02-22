import { createAction, handleActions } from 'redux-actions';
import setState from './reduxUtils';
//action types
const GETBOARD = '/boards/GET';
const ADDBOARD = '/boards/ADD';
const DELETEBOARD = '/boards/DELETE';
const SETSTATE = '/boards/SETSTATE';
//createAction(action maker)
export const get = createAction(GETBOARD);
export const add = createAction(ADDBOARD);
export const del = createAction(DELETEBOARD);
export const setData = createAction(SETSTATE);
//initialState
const initialState = {
  data: [],
  code: 0,
  recentBoard: [],
};

//handleActions(Reducer)
const board = handleActions(
  {
    [GETBOARD]: setState,
    [ADDBOARD]: setState,
    [DELETEBOARD]: setState,
    [SETSTATE]: setState,
  },
  initialState,
);

export default board;
