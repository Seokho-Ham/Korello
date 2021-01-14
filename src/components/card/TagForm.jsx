import React, { useState, memo, useCallback } from 'react';
import AddCardButton from './AddCardButton';
import CardListForm from './CardListForm';
import { useUpdateApi } from '../../api/index';
import { useDrop } from 'react-dnd';

const TagForm = ({ data, tag, boardUrl, setUpdate }) => {
  const [updateData] = useUpdateApi();

  const appendItem = useCallback(async item => {
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
        alert('이동 실패');
      }
    }
  });

  const [{ hovered }, drop] = useDrop({
    accept: 'card',
    drop: appendItem,
    collect: monitor => {
      return {
        hovered: monitor.isOver(),
      };
    },
  });

  return (
    <div className='tag'>
      <div className='tag-header'>{tag}</div>
      <div
        className={`drop-area ${hovered ? 'drop-area-hovered' : ''}`}
        ref={drop}
      >
        {console.log(data)}
        {data
          .sort((a, b) => a.id - b.id)
          .map(el => {
            return (
              <CardListForm
                key={el.id}
                id={el.id}
                title={el.name}
                memberNames={el.memberNames}
                labels={el.labels}
                tag={tag}
                url={boardUrl}
                setUpdate={setUpdate}
              />
            );
          })}
      </div>
      <AddCardButton tag={tag} url={boardUrl} setUpdate={setUpdate} />
    </div>
  );
};

export default memo(TagForm);
