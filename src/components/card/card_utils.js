import { fetchCard, fetchData, fetchEvents, getRefreshToken } from '../../api';
import { setCardData } from '../../reducers/card.reducer';
import { getFields, setFirebaseData } from '../../firebase';
import { searchUser } from '../../reducers/user.reducer';

export const getCard = async (uri, dispatch, boardId) => {
  let [cards, code, error] = await fetchCard(uri);
  console.log(cards);
  if (!error) {
    const fbData = await getFields(boardId);
    const list = {};
    const cardlabels = {};

    fbData.forEach(el => {
      list[el] = [];
    });

    if (cards.length > 0) {
      cards.forEach(async el => {
        if (!el) return null;
        if (!list[el.tagValue]) {
          list[el.tagValue] = [el];
          fbData.push(el.tagValue);
          await setFirebaseData(boardId, {
            [el.tagValue]: { name: el.tagValue, createdAt: new Date() },
          });
        } else {
          list[el.tagValue].push(el);
        }
        cardlabels[el.id] = el.labels;
      });
    }
    let [userlist] = await fetchData('/members');
    // console.log(userlist);
    let [memberlist] = await fetchData(`/board/${boardId}/members`);
    // console.log(memberlist);
    let [events] = await fetchEvents(`/events/board/${boardId}`);
    let [labels] = await fetchData(uri.slice(0, uri.length - 6) + '/label');

    let payload = {
      loading: false,
      taglist: fbData ? fbData : [],
      cardlist: list,
      labellist: labels ? labels : [],
      cardlabels: cardlabels,
      currentBoardUrl: uri,
      eventlogs: events,
      memberlist: memberlist,
    };
    dispatch(searchUser({ userList: userlist }));
    dispatch(setCardData(payload));
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
