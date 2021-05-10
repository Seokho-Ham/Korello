import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postData, getRefreshToken } from '../../api';
import { boardActions } from '../../reducers/board.reducer';
import { db } from '../../firebase';
import { useHistory } from 'react-router';
import styled from 'styled-components';

const NewBoardForm = () => {
  const [boardName, setBoardName] = useState('');
  const [display, setDisplay] = useState(false);
  const { boardlist } = useSelector(state => state.board);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const history = useHistory();

  const addBoard = async e => {
    if (e) {
      e.preventDefault();
    }

    if (boardName.length > 0) {
      let [responseData, code, err] = await postData('/board', {
        name: boardName,
      });
      if (code === 201) {
        setBoardName('');
        onClickHandler();
        await db.doc(responseData.id).set({});
        dispatch(
          boardActions.setBoardData({
            boardlist: [...boardlist, responseData],
          }),
        );
        history.push(`/board/${responseData.id}/cards`);
      } else if (code >= 401001) {
        await getRefreshToken();
        await addBoard(e);
      } else {
        alert(err);
        setBoardName('');
        inputRef.current.focus();
      }
    } else {
      alert('이름을 입력해주세요.');
      inputRef.current.focus();
    }
  };

  const onClickHandler = () => {
    setDisplay(p => !p);
  };

  const onChangeHandler = e => {
    setBoardName(e.target.value);
  };
  useEffect(() => {
    if (display) {
      inputRef.current.focus();
    }
  });
  return (
    <>
      <AddBoardForm>
        {!display ? (
          <AddBoardContainer>
            <div onClick={onClickHandler}>Create New Board</div>
          </AddBoardContainer>
        ) : (
          <AddBoardContainer>
            <form onSubmit={addBoard}>
              <input
                ref={inputRef}
                placeholder='board name'
                value={boardName}
                onChange={onChangeHandler}
              />
              <AddBoardButton name='add' onClick={addBoard}>
                Add
              </AddBoardButton>
            </form>
            <AddBoardButton onClick={onClickHandler}>Cancel</AddBoardButton>
          </AddBoardContainer>
        )}
      </AddBoardForm>
    </>
  );
};

export default NewBoardForm;

const AddBoardForm = styled.div`
  height: 100%;
  background-color: rgba(0, 0, 0, 0.21);
  border-radius: 4px;
`;
const AddBoardContainer = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  position: relative;
  top: 10px;
  div {
    width: 100%;
    height: 100%;
    font-size: 17px;
    font-weight: 500;

    margin-top: 0px;
    margin-bottom: 0px;
    p {
    }
  }
`;
const AddBoardButton = styled.button`
  border-radius: 6px;
  border: 0px;
  padding: 8px;
  color: ${props => (props.name ? '#fff' : '')};
  background-color: ${props => (props.name ? '#5aac44' : '')};
  &:hover {
    opacity: 0.5;
  }
`;
