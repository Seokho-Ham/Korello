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

  return (
    <div
      style={{
        float: 'left',
        margin: '20px',
        backgroundColor: 'gray',
        width: '350px',
      }}
    >
      <div
        id='card-header'
        style={{ textAlign: 'center', backgroundColor: 'yellow' }}
      >
        {title}
      </div>
      <div id='card-list'>
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
      </div>

      <div id='add-button'>
        <AddButton addButton={addButton} setAddButton={setAddButton} />
      </div>
    </div>
  );
};

export default CardForm;
