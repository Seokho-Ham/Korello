import React, { useState } from 'react';
import AddButton from './AddButton';
import CardListForm from './CardListForm';
import NewCardForm from './NewCardForm';

const CardForm = ({ data }) => {
  const { id, title, cards } = data;
  const [cardTitle, setCardTitle] = useState(title);
  const [cardList, setCardList] = useState(cards);
  const [addButton, setAddButton] = useState(false);

  const onClickHandler = () => {};
  const cardStyle = {
    float: 'left',
    margin: '20px',
    backgroundColor: 'gray',
    width: '350px',
  };
  return (
    <div className={`card-${data.id}`} style={cardStyle}>
      <div
        className={`card-${data.id}-header`}
        style={{ textAlign: 'center', backgroundColor: 'yellow' }}
      >
        {title}
      </div>
      <div id={`card-${data.id}-list`}>
        {cards.map(el => {
          return (
            <CardListForm
              key={el.id}
              title={el.title}
              description={el.description}
            />
          );
        })}
        {addButton ? (
          <NewCardForm setAddButton={setAddButton} cards={cards} />
        ) : null}
        <AddButton addButton={addButton} setAddButton={setAddButton} />
      </div>
    </div>
  );
};

export default CardForm;
