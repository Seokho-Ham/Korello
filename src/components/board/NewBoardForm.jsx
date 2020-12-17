import React, { useState, useRef } from 'react';
import apiHandler from '../../api/index';

const NewBoardForm = ({ onClickHandler, setBoardCount }) => {
  const [boardName, setBoardName] = useState('');
  const inputRef = useRef(null);

  const onChangeHandler = e => {
    setBoardName(e.target.value);
  };

  const addBoard = async () => {
    //서버에 post 요청으로 보드 생성
    if (boardName.length > 0) {
      const data = await apiHandler('post', '/board', {
        name: boardName,
      });

      if (data.result_code === 201) {
        setBoardName('');
        setBoardCount(prevState => prevState + 1);
        onClickHandler();
      } else {
        alert('생성에 실패했습니다.');
        setBoardName('');
        inputRef.current.focus();
      }
    } else {
      alert('이름을 입력해주세요.');
      inputRef.current.focus();
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        placeholder='board name'
        type='text'
        value={boardName}
        onChange={onChangeHandler}
        style={{ display: 'block', marginBottom: '5px' }}
      />
      <button onClick={addBoard}>Add</button>
      <button onClick={onClickHandler}>Cancel</button>
    </>
  );
};

export default NewBoardForm;
