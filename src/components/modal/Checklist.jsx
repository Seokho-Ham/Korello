import React, { useCallback, useEffect, useRef, useState } from 'react';
import ChecklistElement from './ChecklistElement';
import styled from 'styled-components';
import { postData, fetchData, getRefreshToken } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { setCardData } from '../../reducers/card.reducer';
import { SendUpdateButton } from './LabelElement';
import { updateCardEvents } from '../card/card_utils';

const Checklist = ({ percent }) => {
  const [clicked, setClicked] = useState(false);
  const [title, setTitle] = useState('');
  const { checklist, currentCardId, cardEventLogs } = useSelector(
    state => state.card,
  );
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const formRef = useRef(null);

  const onOutsideClick = e => {
    if (formRef.current !== null && !formRef.current.contains(e.target)) {
      setClicked(!clicked);
    }
  };
  const clickButtonHandler = () => {
    setClicked(p => !p);
  };

  const addChecklistHandler = async e => {
    e.preventDefault();
    if (title.length > 0) {
      const [responseData, code] = await postData(
        `/card/${currentCardId}/todo`,
        {
          cardId: currentCardId,
          title: title,
        },
      );
      if (code === 201 || code === 200) {
        setTitle('');
        const logs = await updateCardEvents(currentCardId, cardEventLogs);
        let obj = { ...checklist };
        obj[currentCardId].push(responseData);
        dispatch(setCardData({ checklist: obj, cardEventLogs: logs }));
      } else if (code >= 401001) {
        await getRefreshToken();
        await addChecklistHandler(e);
      } else {
        alert('생성 실패!');
      }
    } else {
      alert('title을 입력해주세요');
    }
  };
  const onChangeHandler = e => {
    setTitle(e.target.value);
  };
  useEffect(() => {
    if (clicked) inputRef.current.focus();
  }, [clicked]);
  useEffect(() => {
    if (clicked) {
      window.addEventListener('click', onOutsideClick);
    }
    return () => {
      window.removeEventListener('click', onOutsideClick);
    };
  }, [clicked]);

  return (
    <>
      <div>
        <h4 style={{ margin: '0px 0px 5px 0px' }}>CheckList</h4>
        <ProgressContainer>
          <ProgressContent>{percent}%</ProgressContent>
          <ProgressBar>
            <ProgressPercentBar percent={percent}></ProgressPercentBar>
          </ProgressBar>
        </ProgressContainer>
      </div>
      <CheckListInner>
        {checklist[currentCardId].map((el, i) => (
          <ChecklistElement key={i} el={el} />
        ))}
      </CheckListInner>
      <CheckListAddForm ref={formRef}>
        {clicked ? (
          <>
            <form onSubmit={addChecklistHandler}>
              <input
                placeholder='title'
                value={title}
                onChange={onChangeHandler}
                ref={inputRef}
              ></input>
              <ChecklistAddButton>Add</ChecklistAddButton>
            </form>
          </>
        ) : (
          <ChecklistStatusButton onClick={clickButtonHandler}>
            + Add an item
          </ChecklistStatusButton>
        )}
      </CheckListAddForm>
    </>
  );
};

export default Checklist;

const ProgressContainer = styled.div`
  position: relative;
  margin-bottom: 6px;
`;
const ProgressContent = styled.div`
  color: #5e6c84;
  font-size: 11px;
`;
const ProgressBar = styled.div`
  overflow: hidden;
  position: relative;
  height: 8px;
  background-color: rgba(9, 30, 66, 0.08);
  border-radius: 50px;
`;
const ProgressPercentBar = styled.div`
  width: ${props => props.percent}%;
  height: 100%;
  background-color: #3333;
  transition: width 0.2s ease-in-out;
`;
const CheckListInner = styled.div`
  display: flex;
  flex-direction: column;
`;
const CheckListAddForm = styled.div`
  input {
    display: block;
    width: 90%;
    border: 0px;
    height: 27px;
    box-shadow: inset 0 0 0 2px #0079bf;
  }
`;

const ChecklistAddButton = styled(SendUpdateButton)`
  display: inline;
  margin-top: 5px;
  width: 50px;
`;

const ChecklistStatusButton = styled.button`
  background-color: rgba(9, 30, 66, 0.08);
  height: 30px;
  border: 0;
  color: #172b4d;
  margin: 3px;
  border-radius: 3px;
  &:hover {
    background-color: hsla(0, 0%, 74%, 0.5);
  }
`;
