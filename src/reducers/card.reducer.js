import { createAction, handleActions } from 'redux-actions';
import setState from './reduxUtils';

const GETCARD = '/card/GETCARD';
const UPDATECARD = '/card/UPDATECARD';
const ADDCARD = '/card/ADDCARD';
const DELETECARD = '/card/DELETECARD';
const GETMODAL = '/card/GETMODAL';

export const getCards = createAction(GETCARD);
export const updateCard = createAction(UPDATECARD);
export const addCard = createAction(ADDCARD);
export const deleteCard = createAction(DELETECARD);
export const getModal = createAction(GETMODAL);
const initialState = {
  tagList: [],
  cardList: [],
  modalList: [],
};

const card = handleActions(
  {
    [GETCARD]: setState,
    [UPDATECARD]: setState,
    [ADDCARD]: setState,
    [DELETECARD]: setState,
    [GETMODAL]: setState,
  },
  initialState,
);
export default card;
