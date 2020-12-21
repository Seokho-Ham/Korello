import React, { useState, memo } from 'react';
import AddCardButton from './AddCardButton';
import CardListForm from './CardListForm';

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
            console.log(1);
            return (
              <CardListForm
                key={el.id}
                id={el.id}
                title={el.name}
                // description={el.description}
                tag={tag}
                url={boardUrl}
                setUpdate={setUpdate}
              />
            );
          })}

        <AddCardButton
          addButton={addButton}
          setAddButton={setAddButton}
          tag={tag}
          url={boardUrl}
          setUpdate={setUpdate}
        />
      </div>
    </div>
  );
};

export default memo(TagForm);
