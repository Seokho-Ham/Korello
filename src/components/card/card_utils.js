import { findRenderedComponentWithType } from 'react-dom/test-utils';
import { fetchCard, fetchData } from '../../api';
import { setData } from '../../reducers/card.reducer';
import { timestamp, getFields, setFirebaseData } from '../../firebase';

export const getCard = async (uri, dispatch, boardId) => {
  let [cards, code, error] = await fetchCard(uri);
  if (!error) {
    const fbData = await getFields(boardId);
    // console.log('fbdata: ', fbData);
    const cardlist = [];

    if (cards.length > 0) {
      cards.forEach(el => {
        if (!el) return null;
        if (!cardlist[fbData.indexOf(el.tagValue)]) {
          cardlist[fbData.indexOf(el.tagValue)] = [el];
        } else {
          cardlist[fbData.indexOf(el.tagValue)].push(el);
        }
      });
    }

    // console.log('cards: ', cardlist);
    let [labels] = await fetchData(uri.slice(0, uri.length - 6) + '/label');
    let payload = {
      loading: false,
      taglist: fbData ? fbData : [],
      cardlist: cardlist ? cardlist : [],
      labellist: labels ? labels : [],
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

export const setFBData = async (boardId, data) => {
  // const collectionData = await db.get();
  // const boardLists = collectionData.docs.map(doc => doc.id);
  // if (!boardLists.includes(boardId)) {
  //   await db.doc(boardId).set(data ? data : {}, { merge: true });
  // }
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
