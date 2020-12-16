import React, { useState } from 'react';
import AddButton from './AddButton';
import CardListForm from './CardListForm';
import NewCardForm from './NewCardForm';

const CardForm = ({ data }) => {
  const { id, title, cards } = data;
  const [addButton, setAddButton] = useState(false);

  const cardStyle = {
    float: 'left',
    margin: '20px',
    backgroundColor: '#ebecf0',
    width: '350px',
    borderRadius: '4px',
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
