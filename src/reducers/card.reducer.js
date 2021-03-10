import { createAction, handleActions } from 'redux-actions';
import setState from './reduxUtils';

const GETCARD = '/card/GETCARD';
const MOVECARD = '/card/MOVECARD';
const SETSTATE = '/card/SETSTATE';

export const getCards = createAction(GETCARD);
export const setData = createAction(SETSTATE);

export const moveCard = createAction(MOVECARD);

const initialState = {
  taglist: [],
  cardlist: [],
  checklist: {},
  labellist: [],
  cardlabels: {},
  currentBoardId: '',
  currentBoardUrl: '',
  currentCardId: '',
};

const card = handleActions(
  {
    [GETCARD]: setState,
    [SETSTATE]: setState,
    [MOVECARD]: (state, action) => {
      console.log('move!!!!!');
      let { destination, source } = action.payload;
      //옮겨질 태그 번호
      let result = state.cardList.slice();
      let endNum = state.tagList.indexOf(destination.droppableId);
      let startNum = state.tagList.indexOf(source.droppableId);
      //cardList의 해당 num위치의 배열에 destination.index에 추가.
      //cardList의 source.droppableId의 num위치에 index 번호 삭제.
      result[endNum].splice(
        destination.index,
        0,
        result[startNum][source.index],
      );
      result[startNum].splice(source.index, 1);
      console.log(result);
      return {
        ...state,
        cardList: result,
      };
    },
  },
  initialState,
);
export default card;
