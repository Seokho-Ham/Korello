import React, { useState, memo, useCallback } from 'react';
import AddCardButton from './AddCardButton';
import CardListForm from './CardListForm';
import { useUpdateApi } from '../../api/index';
import { useDrop } from 'react-dnd';

const TagForm = ({ data, tag, boardUrl, setUpdate }) => {
  const [addButton, setAddButton] = useState(false);
  const [items, setItems] = useState();
  const [updateData] = useUpdateApi();

  const appendItem = useCallback(async item => {
    console.log(item);
    setItems(item);
    if (item.tagValue !== tag) {
      const code = await updateData(
        boardUrl.slice(0, boardUrl.length - 1) + '/tag',
        {
          id: item.id,
          tagValue: tag,
        },
      );
      if (code === 200) {
        setUpdate(p => !p);
      } else {
        alert('');
      }
    }
  });

  const [collectedProps, drop] = useDrop({
    accept: 'card',
    drop: appendItem,
    collect: monitor => {
      return {
        hovered: monitor.isOver(),
      };
    },
  });

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
      <div
        // id={`card-${tag}-list`}
        className={`drop-area ${
          collectedProps.hovered ? 'drop-area-hovered' : ''
        }`}
        ref={drop}
      >
        {data
          .sort((a, b) => a.id - b.id)
          .map(el => {
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
      </div>
      <AddCardButton
        addButton={addButton}
        setAddButton={setAddButton}
        tag={tag}
        url={boardUrl}
        setUpdate={setUpdate}
      />
    </div>
  );
};

export default memo(TagForm);
