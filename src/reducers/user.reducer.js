import { createAction, handleActions } from 'redux-actions';
import setState from './reduxUtils';

//action types
const LOGIN = '/user/LOGIN';
const LOGOUT = '/user/LOGOUT';

export const login = createAction(LOGIN);
export const logout = createAction(LOGOUT);

const initialState = {
  status: false,
};

const user = handleActions(
  {
    [LOGIN]: setState,
    [LOGOUT]: setState,
  },
  initialState,
);

export default user;
