import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { fetchEvents, getRefreshToken, postData } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { setCardData } from '../../reducers/card.reducer';

const AddButton = ({ tag }) => {
  const [title, setTitle] = useState('');
  const [visibility, setVisibility] = useState(false);
  const { currentBoardUrl, currentBoardId, cardlist } = useSelector(
    state => state.card,
  );
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const formRef = useRef(null);
  const onChangeHandler = e => {
    setTitle(e.target.value);
  };

  const onClickHandler = () => {
    setVisibility(prevState => !prevState);
  };

  const pageClickEvent = e => {
    if (formRef.current !== null && !formRef.current.contains(e.target)) {
      setVisibility(!visibility);
    }
  };

  const addCardHandler = async e => {
    e.preventDefault();
    if (title.length > 0) {
      const [responseData, code] = await postData(
        `${currentBoardUrl.slice(0, currentBoardUrl.length - 1)}`,
        {
          tagValue: tag,
          name: title,
        },
      );

      if (code === 201) {
        const [events] = await fetchEvents(`/events/board/${currentBoardId}`);
        setTitle('');
        let list = { ...cardlist };
        list[responseData.tagValue]
          ? list[responseData.tagValue].push(responseData)
          : (list[responseData.tagValue] = [responseData]);

        dispatch(setCardData({ cardlist: list, eventlogs: events }));
      } else if (code >= 401001) {
        await getRefreshToken();
        await addCardHandler(e);
      } else {
        alert('생성에 실패했습니다.');
        setTitle('');
        inputRef.current.focus();
      }
    } else {
      alert('이름을 입력해주세요.');
      inputRef.current.focus();
    }
  };
  useEffect(() => {
    if (visibility) {
      inputRef.current.focus();
    }
  });

  useEffect(() => {
    if (visibility) {
      window.addEventListener('click', pageClickEvent);
    }
    return () => {
      window.removeEventListener('click', pageClickEvent);
    };
  }, [visibility]);

  return (
    <>
      <NewCardContainer>
        {visibility ? (
          <NewCardForm ref={formRef}>
            <form onSubmit={addCardHandler}>
              <CardAddInput
                name='title'
                type='text'
                placeholder='title'
                value={title}
                onChange={onChangeHandler}
                ref={inputRef}
              />

              <CardAddButton>Add Card</CardAddButton>
            </form>
          </NewCardForm>
        ) : (
          <NewCardForm>
            <CardAddStateButton onClick={onClickHandler}>
              + Add another card
            </CardAddStateButton>
          </NewCardForm>
        )}
      </NewCardContainer>
    </>
  );
};

export default AddButton;
const NewCardContainer = styled.div`
  box-sizing: border-box;
`;
const NewCardForm = styled.div`
  box-sizing: border-box;
  margin: 5px 10px;
`;

const CardAddStateButton = styled.button`
  margin: 0px 5px 5px 0px;
  text-align: left;
  height: 35px;
  width: 100%;

  background-color: #ebecf0;
  border: 0px;
  color: #5e6c84;
  &:hover {
    background-color: hsla(0, 0%, 74%, 0.5);
    color: #172b4d;
  }
`;

const CardAddButton = styled.button`
  margin: 7px 2px 6px 2px;
  background-color: #5aac44;
  color: #fff;
  padding: 4px;
  border-radius: 4px;
  &:hover {
    background-color: #61d341;
  }
`;

const CardAddInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 33px;
  margin: 0px;
  border: 1px;
  padding: 5px;
  box-shadow: inset 0 0 0 2px #0079bf;
`;
