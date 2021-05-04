import { createAction, handleActions } from 'redux-actions';
import setState from './reduxUtils';

//action types

const SEARCH = '/user/SEARCH';
const INFO = '/user/INFO';
export const userActions = {
  searchUser: createAction(SEARCH),
  setUserInfo: createAction(INFO),
};

const initialState = {
  loginStatus: false,
  userInfo: null,
  userList: [],
};

const user = handleActions(
  {
    [SEARCH]: setState,
    [INFO]: setState,
  },
  initialState,
);

export default user;
