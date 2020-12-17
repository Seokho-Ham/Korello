import React, { useState, memo } from 'react';
import AddButton from './AddButton';
import CardListForm from './CardListForm';
import NewCardForm from './NewCardForm';

const TagForm = ({ data, tag, boardUrl, setUpdate }) => {
  const [addButton, setAddButton] = useState(false);

  const cardStyle = {
    float: 'left',
    margin: '20px',
    backgroundColor: '#ebecf0',
    width: '350px',
    borderRadius: '4px',
  };

  return (
    <div className={`card-${tag}`} style={cardStyle}>
      <div
        className={`card-${tag}-header`}
        style={{ textAlign: 'center', backgroundColor: 'yellow' }}
      >
        {tag}
      </div>
      <div id={`card-${tag}-list`}>
        {data
          .sort((a, b) => a.id - b.id)
          .map(el => {
            return (
              <CardListForm
                key={el.id}
                title={el.name}
                // description={el.description}
              />
            );
          })}
        {addButton ? (
          <NewCardForm
            setAddButton={setAddButton}
            tag={tag}
            url={boardUrl}
            setUpdate={setUpdate}
          />
        ) : null}
        <AddButton addButton={addButton} setAddButton={setAddButton} />
      </div>
    </div>
  );
};

export default memo(TagForm);
