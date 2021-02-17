import { combineReducers } from 'redux';
import board from './board.reducer';
import user from './user.reducer';
import card from './card.reducer';
const rootReducer = combineReducers({
  board,
  user,
  card,
});
export default rootReducer;
