import { fetchCard, fetchData, getRefreshToken } from '../../api';
import { setData } from '../../reducers/card.reducer';
import { getFields } from '../../firebase';
import axios from 'axios';

export const getCard = async (uri, dispatch, boardId) => {
  let [cards, code, error] = await fetchCard(uri);

  if (!error) {
    const fbData = await getFields(boardId);
    const list = {};
    const cardlabels = {};

    fbData.forEach(el => {
      list[el] = [];
    });
    if (cards.length > 0) {
      cards.forEach(el => {
        if (!el) return null;
        list[el.tagValue].push(el);
        cardlabels[el.id] = el.labels;
      });
    }

    let events = await getEvents(boardId);
    // console.log(events.data.result_body);
    let [labels] = await fetchData(uri.slice(0, uri.length - 6) + '/label');

    // console.log(list);
    let payload = {
      loading: false,
      taglist: fbData ? fbData : [],
      cardlist: list,
      labellist: labels ? labels : [],
      cardlabels: cardlabels,
      currentBoardUrl: uri,
      eventlogs: events,
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

export const getEvents = async boardId => {
  try {
    let events = await axios.get(
      `https://hyuki.app/api/v2/events/board/${boardId}`,
    );
    return events.data.result_body;
  } catch (err) {
    if (err.response) {
      if (err.response) {
        if (err.response.data.result_code >= 401001) {
          await getRefreshToken();
          await getEvents(boardId);
        }
      } else {
        console.log(err);
      }
    }
  }
};
