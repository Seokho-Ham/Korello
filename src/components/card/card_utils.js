import { fetchCard, fetchData } from '../../api';
import { setData } from '../../reducers/card.reducer';
import { getFields } from '../../firebase';

export const getCard = async (uri, dispatch, boardId) => {
  let [cards, code, error] = await fetchCard(uri);
  if (!error) {
    const fbData = await getFields(boardId);
    // console.log(fbData);
    const list = {};
    const cardlabels = {};
    if (cards.length > 0) {
      cards.forEach(el => {
        if (!el) return null;
        if (!list[el.tagValue]) {
          list[el.tagValue] = [el];
        } else {
          list[el.tagValue].push(el);
        }
        cardlabels[el.id] = el.labels;
      });
    }
    // console.log(cards);
    let [labels] = await fetchData(uri.slice(0, uri.length - 6) + '/label');

    let payload = {
      loading: false,
      taglist: fbData ? fbData : [],
      cardlist: list,
      labellist: labels ? labels : [],
      cardlabels: cardlabels,
      currentBoardUrl: uri,
    };
    dispatch(setData(payload));
  } else {
    console.log(error);
  }
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

export const progressCalculator = data => {
  let count = 0;
  data.forEach(el => {
    if (el.status) {
      count++;
    }
  });
  const result = Math.round((count / data.length) * 100);
  return result;
};
