import { fetchCard, fetchData, fetchEvents, getRefreshToken } from '../api';
import { setCardData } from '../reducers/card.reducer';
import { getFields, setFirebaseData } from '../firebase';
import { userActions } from '../reducers/user.reducer';

export const getCard = async (uri, dispatch, boardId) => {
  let [cards, code, error] = await fetchCard(uri);
  console.log(cards);
  if (!error) {
    const taglist = await getFields(boardId);
    const [userList] = await fetchData('/members');
    const [memberlist] = await fetchData(`/board/${boardId}/members`);
    const [boardlabels] = await fetchData(
      uri.slice(0, uri.length - 6) + '/label',
    );
    const [boardEventLogs] = await fetchEvents(`/events/board/${boardId}`);

    const cardlist = {};
    const cardlabels = {};

    taglist.forEach(el => {
      cardlist[el] = [];
    });

    if (cards.length > 0) {
      cards.forEach(async el => {
        if (!el) return null;
        if (!cardlist[el.tagValue]) {
          cardlist[el.tagValue] = [el];
          taglist.push(el.tagValue);
          await setFirebaseData(boardId, {
            [el.tagValue]: { name: el.tagValue, createdAt: new Date() },
          });
        } else {
          cardlist[el.tagValue].push(el);
        }
        cardlabels[el.id] = el.labels;
      });
    }

    let payload = {
      loading: false,
      taglist,
      cardlist,
      boardlabels,
      cardlabels,
      currentBoardUrl: uri,
      boardEventLogs,
      memberlist,
    };
    dispatch(userActions.searchUser({ userList }));
    dispatch(setCardData(payload));
  } else {
    console.log(error);
  }
};

export const setLastViewList = location => {
  const boardId = location.pathname.split('/')[2];

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
