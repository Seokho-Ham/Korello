import { fetchCard, fetchData, fetchEvents, getRefreshToken } from '../api';
import { setCardData } from '../reducers/card.reducer';
import { getFields, setFirebaseData } from '../firebase';
import { userActions } from '../reducers/user.reducer';

export const getCard = async (uri, dispatch, boardId) => {
  let [cards, code, error] = await fetchCard(uri);

  if (!error) {
    const taglist = await getFields(boardId);
    const [userList] = await fetchData('/members');
    const [memberlist] = await fetchData(`/board/${boardId}/members`);
    const [boardlabels] = await fetchData(`/board/${boardId}/label`);
    const [boardEventLogs] = await fetchEvents(`/events/board/${boardId}`);
    let cardlist = {},
      cardlabels = {};

    if (cards.length) {
      const [cardData, cardLabelData] = makeCardList(cards, taglist, boardId);
      cardlist = cardData;
      cardlabels = cardLabelData;
    }

    dispatch(userActions.searchUser({ userList }));
    dispatch(
      setCardData({
        loading: false,
        taglist,
        cardlist,
        boardlabels,
        cardlabels,
        currentBoardUrl: uri,
        boardEventLogs,
        memberlist,
      }),
    );
  } else {
    console.log(error);
  }
};

export const setLastViewList = boardId => {
  let lastViewList = JSON.parse(localStorage.getItem('lastView'));
  if (lastViewList) {
    if (lastViewList.length >= 4) {
      lastViewList = lastViewList.splice(0, 4);
    }
    if (lastViewList.includes(parseInt(boardId))) {
      lastViewList.splice(lastViewList.indexOf(parseInt(boardId)), 1);
    }
    localStorage.setItem(
      'lastView',
      JSON.stringify([parseInt(boardId), ...lastViewList]),
    );
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

export const updateCardEvents = async (cardId, state) => {
  try {
    let [cardEvents] = await fetchEvents(`/events/card/${cardId}`);
    let logs = {};
    for (let key in state) {
      logs[key] = state[key];
    }
    logs[cardId] = cardEvents;

    return logs;
  } catch (err) {
    if (err.response) {
      if (err.response) {
        if (err.response.data.result_code >= 401001) {
          await getRefreshToken();
          await updateCardEvents(cardId);
        }
      } else {
        console.log(err);
      }
    }
  }
};
//cardlist, cardlabels 객체 만드는 함수
const makeCardList = (rawCardData, tagArr, id) => {
  const cardlist = {};
  const cardlabels = {};
  rawCardData.forEach(async el => {
    if (!cardlist[el.tagValue]) {
      cardlist[el.tagValue] = [el];
      if (!tagArr.includes(el.tagValue)) {
        tagArr.push(el.tagValue);
        await setFirebaseData(id, {
          [el.tagValue]: { name: el.tagValue, createdAt: new Date() },
        });
      }
    } else {
      cardlist[el.tagValue].push(el);
    }
    cardlabels[el.id] = el.labels;
  });

  return [cardlist, cardlabels];
};
