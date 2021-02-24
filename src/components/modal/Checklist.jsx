import React, { useState } from 'react';
import ChecklistElement from './ChecklistElement';
import { postData, fetchData, getRefreshToken } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { setData } from '../../reducers/card.reducer';
import styled from 'styled-components';
const Checklist = ({ percent }) => {
  const [clicked, setClicked] = useState(false);
  const [title, setTitle] = useState('');
  const { checklist, currentCardId } = useSelector(state => state.card);
  const dispatch = useDispatch();

  const clickButtonHandler = () => {
    setClicked(p => !p);
  };

  const addChecklistHandler = async e => {
    e.preventDefault();
    if (title.length > 0) {
      const code = await postData(`/card/${currentCardId}/todo`, {
        cardId: currentCardId,
        title: title,
      });
      if (code === 201 || code === 200) {
        setTitle('');
        setClicked(p => !p);
        const [checklist] = await fetchData(`/card/${currentCardId}/todo`);
        dispatch(setData({ checklist: checklist ? checklist : [] }));
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
        {checklist.map((el, i) => (
          <ChecklistElement key={i} el={el} />
        ))}
      </CheckListInner>
      <CheckListAddForm>
        {clicked ? (
          <>
            <form onSubmit={addChecklistHandler}>
              <input
                placeholder='title'
                value={title}
                onChange={onChangeHandler}
              ></input>
              <button>Add</button>
            </form>
            <button onClick={clickButtonHandler}>Cancel</button>
          </>
        ) : (
          <button onClick={clickButtonHandler}>Add an item</button>
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
  width: ${props => props.percent};
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
  }
  button {
    margin: 2px 1px 2px 0px;
  }
`;
