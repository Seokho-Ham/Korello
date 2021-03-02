import React, { memo } from 'react';
import AddCardButton from './AddCardButton';
import CardListForm from './CardListForm';
import { useSelector } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
const TagForm = ({ tag, tagIndex }) => {
  const { cardlist } = useSelector(state => state.card);

  return (
    <TagWrapper>
      <Tag>
        <TagHeader>{tag}</TagHeader>
        <Droppable droppableId={tag}>
          {provided => {
            return (
              <TagElement {...provided.droppableProps} ref={provided.innerRef}>
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
              </TagElement>
            );
          }}
        </Droppable>
        <AddCardButton tag={tag} />
      </Tag>
    </TagWrapper>
  );
};

export default memo(TagForm);

const TagWrapper = styled.div`
  width: 272px;
  margin: 10px 10px;
  height: 90%;
  box-sizing: border-box;
  display: inline-block;
  vertical-align: top;
  white-space: nowrap;
`;

const Tag = styled.div`
  background-color: #ebecf0;
  border-radius: 3px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-height: 90%;
  position: relative;
  white-space: normal;
  overflow-y: auto;
`;

const TagHeader = styled.div`
  margin: 15px 0px 3px 0px;
  border-radius: 6px;
  padding: 0 0 0 14px;
  font-size: 18px;
  font-weight: 500;
  color: #172b4d;
  background-color: #ebecf0;
`;
const TagElement = styled.div`
  overflow: scroll;
`;
