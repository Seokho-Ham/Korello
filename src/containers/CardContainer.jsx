import { useSelector } from 'react-redux';
import { getCardApi } from '../api/getAPI';
import CardList from '../components/card/CardList';
import { getCards } from '../reducers/card.reducer';

export const fetchCard = async (uri, dispatch) => {
  let [tags, cards] = await getCardApi(uri);
  let payload = {
    tagList: tags ? tags : [],
    cardList: cards ? cards : [],
  };
  dispatch(getCards(payload));
};

const CardContainer = ({ location }) => {
  const data = useSelector(state => state.card);

  return <CardList location={location} fetchCard={fetchCard} data={data} />;
};
export default CardContainer;
