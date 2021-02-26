import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postData, fetchData, getRefreshToken } from '../../api';
import { setData } from '../../reducers/card.reducer';
import styled from 'styled-components';

const ChecklistModal = () => {
  const [clicked, setClicked] = useState(false);
  const [checkListTitle, setCheckListTitle] = useState('');
  const { currentCardId } = useSelector(state => state.card);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const clickButton = () => {
    setClicked(p => !p);
  };
  const onChangeHandler = e => {
    setCheckListTitle(e.target.value);
  };
  const addCheckList = async e => {
    e.preventDefault();
    if (checkListTitle.length > 0) {
      const code = await postData(`/card/${currentCardId}/todo`, {
        cardId: currentCardId,
        title: checkListTitle,
      });
      if (code === 201 || code === 200) {
        setCheckListTitle('');
        setClicked(p => !p);
        const [checklist] = await fetchData(`/card/${currentCardId}/todo`);
        dispatch(setData({ checklist: checklist ? checklist : [] }));
      } else if (code >= 401001) {
        await getRefreshToken();
        await addCheckList(e);
      } else {
        alert('체크리스트 생성 실패');
        inputRef.current.focus();
      }
    } else {
      alert('title을 입력해주세요.');
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (clicked) inputRef.current.focus();
  });

  return (
    <ChecklistModalButton>
      <button onClick={clickButton}>CheckList</button>
      {clicked ? (
        <ChecklistAddModal>
          <form onSubmit={addCheckList}>
            <ChecklistInput
              placeholder='checklist title'
              value={checkListTitle}
              onChange={onChangeHandler}
              style={{ display: 'block' }}
              ref={inputRef}
            />
            <button>+ Add Checklist</button>
          </form>
        </ChecklistAddModal>
      ) : null}
    </ChecklistModalButton>
  );
};

export default ChecklistModal;

const ChecklistModalButton = styled.div`
  margin: 2px 0px;
  button {
    background-color: rgba(9, 30, 66, 0.04);
    width: 98%;
    height: 30px;
    border: 0;
    color: #172b4d;
    &:hover {
      background-color: hsla(0, 0%, 74%, 0.5);
    }
  }
`;

export const ChecklistAddModal = styled.div`
  min-width: 270px;
  display: block;
  position: relative;
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 3px;
  top: 50%;
  left: 3px;
  margin: 1px auto;
  padding: 25px 8px;
  button {
    background-color: #5aac44;
    height: 30px;
    border: 0;
    color: #fff;
    border-radius: 3px;
    &:hover {
      opacity: 0.8;
      background-color: #5aac44;
    }
  }
`;

export const ChecklistInput = styled.input`
  border-radius: 3px;
  display: inline-block;
  margin: 2px;
  width: 96%;
  height: 25px;
  padding: 3px;
  border: 0px;
  border-radius: 3px;
  background-color: ${props => props.color};
  box-shadow: inset 0 0 0 2px #0079bf;
`;
