import { createAction, handleActions } from 'redux-actions';
import setState from './reduxUtils';

//action types
const LOGIN = '/user/LOGIN';
const LOGOUT = '/user/LOGOUT';
const SEARCH = '/user/SEARCH';
const JOIN = '/user/JOIN';
const KICK = '/user/KICK';

export const login = createAction(LOGIN);
export const logout = createAction(LOGOUT);
export const searchUser = createAction(SEARCH);
export const joinBoard = createAction(JOIN);
export const kickBoard = createAction(KICK);

const initialState = {
  status: false,
  userList: [],
};

const user = handleActions(
  {
    [LOGIN]: setState,
    [LOGOUT]: setState,
    [SEARCH]: setState,
  },
  initialState,
);

export default user;
