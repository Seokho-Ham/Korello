import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCard, fetchData } from '../api';
import CardList from '../components/card/CardList';
import { getCards } from '../reducers/card.reducer';

//card 데이터를 받아와서 dispatch까지 하는 동작
export const getCard = async (uri, dispatch) => {
  let [tags, cards] = await fetchCard(uri);
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

  useEffect(() => {
    // console.log(location);
    let lastViewList = JSON.parse(localStorage.getItem('lastView'));
    if (lastViewList) {
      if (lastViewList.includes(location.state.id.toString())) {
        lastViewList.splice(
          lastViewList.indexOf(location.state.id.toString()),
          1,
        );
        localStorage.setItem(
          'lastView',
          JSON.stringify([location.state.id, ...lastViewList]),
        );
      } else {
        localStorage.setItem(
          'lastView',
          JSON.stringify([location.state.id, ...lastViewList]),
        );
      }
    } else {
      localStorage.setItem('lastView', JSON.stringify([location.state.id]));
    }

    getCard(`${location.pathname}`, dispatch);
  }, []);

  return <CardList getCard={getCard} />;
};
export default CardContainer;
