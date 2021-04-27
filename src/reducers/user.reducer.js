import { createAction, handleActions } from 'redux-actions';
import setState from './reduxUtils';

//action types

const SEARCH = '/user/SEARCH';

export const userActions = {
  searchUser: createAction(SEARCH),
};

const initialState = {
  loginStatus: false,
  userList: [],
};

const user = handleActions(
  {
    [SEARCH]: setState,
  },
  initialState,
);

export default user;
