import { fetchCard, fetchData } from '../../api';
import { getCards } from '../../reducers/card.reducer';

export const getCard = async (uri, dispatch) => {
  let [tags, cards, code] = await fetchCard(uri);

  let [labels] = await fetchData(uri.slice(0, uri.length - 6) + '/label');
  let payload = {
    taglist: tags ? tags : [],
    cardlist: cards ? cards : [],
    labellist: labels ? labels : [],
    currentBoardUrl: uri,
  };
  dispatch(getCards(payload));
};

export const setLastViewList = location => {
  const boardId = location.pathname.split('/')[2];

  let lastViewList = JSON.parse(localStorage.getItem('lastView'));
  if (lastViewList) {
    if (lastViewList.includes(parseInt(boardId))) {
      lastViewList.splice(lastViewList.indexOf(parseInt(boardId)), 1);
      localStorage.setItem(
        'lastView',
        JSON.stringify([parseInt(boardId), ...lastViewList]),
      );
    } else {
      localStorage.setItem(
        'lastView',
        JSON.stringify([parseInt(boardId), ...lastViewList]),
      );
    }
  } else {
    localStorage.setItem('lastView', JSON.stringify([parseInt(boardId)]));
  }
};
