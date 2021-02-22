import React, { useState } from 'react';
import { getRefreshToken, postData } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { getCard } from './card_utils';
import styled from 'styled-components';
const AddButton = ({ tag }) => {
  const [title, setTitle] = useState('');
  const [display, setDisplay] = useState(false);
  const { currentBoardUrl } = useSelector(state => state.card);
  const dispatch = useDispatch();

  const onChangeHandler = e => {
    setTitle(e.target.value);
  };

  const onClickHandler = () => {
    setDisplay(prevState => !prevState);
  };

  const addCardHandler = async e => {
    e.preventDefault();
    if (title.length > 0) {
      const code = await postData(
        `${currentBoardUrl.slice(0, currentBoardUrl.length - 1)}`,
        {
          tagValue: tag,
          name: title,
        },
      );

      if (code === 201) {
        setTitle('');
        setDisplay(prevState => !prevState);
        getCard(currentBoardUrl, dispatch);
      } else if (code >= 401001) {
        await getRefreshToken();
        await addCardHandler(e);
      } else {
        alert('생성에 실패했습니다.');
        setTitle('');
      }
    } else {
      alert('이름을 입력해주세요.');
    }
  };

  return (
    <>
      <NewCardContainer>
        {display ? (
          <NewCardForm>
            <form onSubmit={addCardHandler}>
              <CardAddInput
                name='title'
                type='text'
                placeholder='title'
                value={title}
                onChange={onChangeHandler}
              ></CardAddInput>

              <CardAddButton>Add Card</CardAddButton>
            </form>
            <CardCancelButton className='cancel' onClick={onClickHandler}>
              X
            </CardCancelButton>
          </NewCardForm>
        ) : (
          // <div className='add-button'>
          <NewCardForm>
            <CardAddStateButton onClick={onClickHandler}>
              + Add another card
            </CardAddStateButton>
          </NewCardForm>
          // </div>
        )}
      </NewCardContainer>
    </>
  );
};

export default AddButton;
const NewCardContainer = styled.div`
  box-sizing: border-box;

  /* position: relative;
  left: 6px; */
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
const CardCancelButton = styled.button`
  background-color: #ebecf0;
  border: 0px;
  margin-left: 5px;
  padding: 7px;
  color: #172b4d;
  &:hover {
    background-color: hsla(0, 0%, 74%, 0.5);
  }
`;

const CardAddButton = styled.button`
  margin: 5px 2px 10px 0px;
  background-color: #5aac44;
  color: #fff;
  padding: 7px;
  border-radius: 6px;
  &:hover {
    background-color: #458534;
  }
`;

const CardAddInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  margin: 0px;
  border: 1px;
  padding: 5px;
  box-shadow: inset 0 0 0 2px #0079bf;
`;
