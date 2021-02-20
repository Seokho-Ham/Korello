import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchCard, fetchData } from '../api';
import CardList from '../components/card/CardList';
import { getCards } from '../reducers/card.reducer';

//card 데이터를 받아와서 dispatch까지 하는 동작
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

const CardContainer = ({ location }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    const boardId = location.pathname.split('/')[2];

    let lastViewList = JSON.parse(localStorage.getItem('lastView'));
    if (lastViewList) {
      if (lastViewList.includes(boardId)) {
        lastViewList.splice(lastViewList.indexOf(boardId), 1);
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

    getCard(`${location.pathname}`, dispatch);
  }, []);

  return <CardList getCard={getCard} />;
};
export default CardContainer;
