import { findRenderedComponentWithType } from 'react-dom/test-utils';
import { fetchCard, fetchData } from '../../api';
import { getCards } from '../../reducers/card.reducer';
import { db } from '../../firebase';

export const getCard = async (uri, dispatch, boardId) => {
  let [taglist, cards, code] = await fetchCard(uri);
  // let data = await db.get();
  // console.log(data.docs.map(el => el.id));
  // if (!data.exists) {
  //   console.log('no documents');
  // } else {
  //   let { tags } = data.data();
  //   console.log('data: ', tags[0]);
  // }
  let [labels] = await fetchData(uri.slice(0, uri.length - 6) + '/label');
  let payload = {
    taglist: taglist ? taglist : [],
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

export const setFBData = async (boardId, data) => {
  const collectionData = await db.get();
  const boardLists = collectionData.docs.map(doc => doc.id);
  if (!boardLists.includes(boardId)) {
    await db.doc(boardId).set(data ? data : {}, { merge: true });
  }
};
