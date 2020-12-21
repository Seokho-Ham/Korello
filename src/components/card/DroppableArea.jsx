import React, { Children, useCallback, useState } from 'react';
import { useDrop } from 'react-dnd';

const DroppableArea = ({ childrens }) => {
  const [items, setItems] = useState([]);

  const appendItem = useCallback(
    item => {
      console.log(item);
      setItems(items => [...items, item]);
    },
    [setItems],
  );

  const [collectedProps, drop] = useDrop({
    accept: 'card',
    drop: appendItem,
    collect: monitor => {
      return {
        hovered: monitor.isOver(),
      };
    },
  });
  const listItems = items.map((item, idx) => (
    <div key={idx} className='dropped-item'>
      {item.id}
      <br></br>
      {item.tagValue}
    </div>
  ));
  return (
    <div>
      <div
        className={`drop-area ${
          collectedProps.hovered ? 'drop-area-hovered' : ''
        }`}
        ref={drop}
      >
        Drop Target
      </div>
      {listItems}
    </div>
  );
};
export default DroppableArea;
