import React, { memo } from 'react';
import AddCardButton from './AddCardButton';
import CardListForm from './CardListForm';
import { useSelector } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';

const TagForm = ({ tag, tagIndex }) => {
  const { cardlist } = useSelector(state => state.card);

  return (
    <div className='tag-wrapper'>
      <div className='tag'>
        <div className='tag-header'>{tag}</div>
        <Droppable droppableId={tag}>
          {provided => {
            return (
              <div
                className='tag-element'
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {cardlist[tagIndex]
                  .sort((a, b) => a.id - b.id)
                  .map((el, i) => {
                    return (
                      <CardListForm
                        key={el.id}
                        index={i}
                        id={el.id}
                        title={el.name}
                        labels={el.labels}
                        tag={tag}
                      />
                    );
                  })}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
        <AddCardButton tag={tag} />
      </div>
    </div>
  );
};

export default memo(TagForm);
