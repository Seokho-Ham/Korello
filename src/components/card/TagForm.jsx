import React, { memo } from 'react';
import AddCardButton from './AddCardButton';
import CardListForm from './CardListForm';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';
import { deleteFirebaseField } from '../../firebase';
import { postData, getRefreshToken } from '../../api';
import { setData } from '../../reducers/card.reducer';

const TagForm = ({ tag }) => {
  const { taglist, cardlist, currentBoardUrl, currentBoardId } = useSelector(
    state => state.card,
  );
  const dispatch = useDispatch();

  const deleteCard = async (url, cardId) => {
    let code = await postData(url.slice(0, url.length - 1) + '/delete', {
      id: cardId,
    });
    if (code === 201) {
    } else if (code >= 401001) {
      await getRefreshToken();
      await deleteCard();
    } else {
      alert('삭제에 실패하였습니다.');
    }
  };

  const deleteTagHandler = async () => {
    await deleteFirebaseField(currentBoardId, tag);
    if (cardlist[tag] && cardlist[tag].length > 0) {
      cardlist[tag].forEach(async el => {
        await deleteCard(currentBoardUrl, el.id);
      });
    }
    let cards = { ...cardlist };
    let tags = taglist.slice('');
    delete cards[tag];
    tags.splice(taglist.indexOf(tag), 1);
    dispatch(setData({ taglist: tags, cardlist: cards }));
  };

  return (
    <TagWrapper>
      <Tag>
        <TagHeader>
          <div>{tag}</div>
          <TagDeleteButton onClick={deleteTagHandler} />
        </TagHeader>
        <Droppable droppableId={tag}>
          {provided => {
            return (
              <TagElement {...provided.droppableProps} ref={provided.innerRef}>
                {cardlist[tag]
                  ? cardlist[tag].map((el, i) => {
                      if (!el) return null;
                      else {
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
                      }
                    })
                  : null}
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
  display: flex;
  margin: 15px 0px 3px 0px;
  border-radius: 6px;
  padding: 0 0 0 14px;
  font-size: 18px;
  font-weight: 500;
  color: #172b4d;
  background-color: #ebecf0;
  div {
    width: 220px;
  }
  button {
    padding: 3px 8px;
    color: #172b4d;
    :hover {
      background-color: hsla(0, 0%, 74%, 0.5);
    }
  }
`;
const TagElement = styled.div`
  overflow: scroll;
  min-height: 40px;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const TagDeleteButton = styled.span`
  display: inline-block;
  background-image: url('https://korello.s3.ap-northeast-2.amazonaws.com/icons/cancel-icon.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 14px;
  width: 20px;
  height: 20px;
  padding: 3px;
  border-radius: 3px;
  :hover {
    opacity: 0.5px;
    background-color: hsla(0, 0%, 74%, 0.5);
  }
`;
