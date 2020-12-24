import React, { useState, useRef } from 'react';
import { usePostApi } from '../../api/index';

const NewBoardForm = ({ onClickHandler }) => {
  const [boardName, setBoardName] = useState('');
  const inputRef = useRef(null);
  const [postData] = usePostApi();

  const onChangeHandler = e => {
    setBoardName(e.target.value);
  };

  const addBoard = async () => {
    if (boardName.length > 0) {
      const code = await postData('/board', {
        name: boardName,
      });
      console.log(code);
      if (code === 201) {
        setBoardName('');
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
    <span id='board-add-button'>
      <input
        ref={inputRef}
        placeholder='board name'
        value={boardName}
        onChange={onChangeHandler}
      />
      <button onClick={addBoard}>Add</button>
      <button onClick={onClickHandler}>Cancel</button>
    </span>
  );
};

export default NewBoardForm;
