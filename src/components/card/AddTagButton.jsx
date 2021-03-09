import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRefreshToken, postData } from '../../api';
import { getCard } from './card_utils';
import styled from 'styled-components';
import { setFirebaseData, timestamp } from '../../firebase';

const AddTagButton = () => {
  const [tagName, setTagName] = useState('');
  const [cardName, setCardName] = useState('');
  const [clicked, setClicked] = useState(false);
  const { currentBoardUrl, currentBoardId } = useSelector(state => state.card);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const buttonStatusHandler = () => {
    setTagName('');
    setCardName('');
    setClicked(prevState => !prevState);
  };
  const onChangeHandler = e => {
    e.target.name === 'tag'
      ? setTagName(e.target.value)
      : setCardName(e.target.value);
  };

  const addTag = async e => {
    e.preventDefault();
    if (!tagName || !cardName) {
      alert('빈칸이 있습니다.');
      inputRef.current.focus();
    } else {
      const code = await postData(
        `${currentBoardUrl.slice(0, currentBoardUrl.length - 1)}`,
        {
          tagValue: tagName,
          name: cardName,
        },
      );
      if (code === 201) {
        await setFirebaseData(currentBoardId, {
          [tagName]: { name: tagName, createdAt: new Date() },
        });

        buttonStatusHandler();
        getCard(currentBoardUrl, dispatch, currentBoardId);
      } else if (code >= 401001) {
        await getRefreshToken();
        await addTag(e);
      } else {
        alert('생성에 실패했습니다.');
        setTagName('');
        inputRef.current.focus();
      }
    }
  };
  useEffect(() => {
    if (clicked) inputRef.current.focus();
  }, [clicked]);
  return (
    <>
      <TagAddContainer clicked={clicked}>
        {clicked ? (
          <TagAddForm>
            <form onSubmit={addTag}>
              <TagAddInput
                name='tag'
                placeholder='tag name'
                value={tagName}
                onChange={onChangeHandler}
                ref={inputRef}
              />
              <TagAddInput
                name='card'
                placeholder='card name'
                value={cardName}
                onChange={onChangeHandler}
              />

              <TagAddButton>Add</TagAddButton>
            </form>
            <TagCancelButton onClick={buttonStatusHandler}>
              Cancel
            </TagCancelButton>
          </TagAddForm>
        ) : (
          <TagAddStateButton onClick={buttonStatusHandler}>
            + Add Another Tag
          </TagAddStateButton>
        )}
      </TagAddContainer>
    </>
  );
};

export default AddTagButton;

const TagAddContainer = styled.div`
  width: 272px;
  margin: 10px 10px;
  box-sizing: border-box;
  display: inline-block;
  background-color: ${props => (props.clicked ? '#ebecf0' : '')};
  border-radius: 4px;
`;
const TagAddInput = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  margin: 0px;
  border: 0.5px;
  margin-bottom: 3px;
  background-color: hsla(0, 0%, 100%, 0.5);
  box-shadow: inset 0 0 0 2px #0079bf;
  padding: 5px;
`;
const TagAddForm = styled.div`
  box-sizing: border-box;
  margin: 7px;
`;
const TagAddButton = styled.button`
  margin: 2px;
  background-color: #5aac44;
  color: #fff;
  padding: 6px;
  border-radius: 6px;
  border: 1px;
  &:hover {
    background-color: #458534;
  }
`;
const TagCancelButton = styled.button`
  display: inline-block;
  background-color: #ebecf0;
  border: 0px;
  margin: 4px;
  padding: 6px;
  color: #172b4d;
  &:hover {
    background-color: hsla(0, 0%, 74%, 0.5);
  }
`;
const TagAddStateButton = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  padding: 3px;
  border: 1px solid hsla(0, 0%, 100%, 0.5);
  border-radius: 3px;
  margin: 3px;
  text-align: center;
  cursor: pointer;
  background-color: hsla(0, 0%, 100%, 0.24);
  &:hover {
    background-color: hsla(0, 0%, 100%, 0.5);
  }
`;
