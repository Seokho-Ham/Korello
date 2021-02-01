import React, { useState, useRef } from 'react';
import { usePostApi, getRefreshToken } from '../../api/index';

const NewBoardForm = ({ onClickHandler, setUpdate, display }) => {
  const [boardName, setBoardName] = useState('');
  const inputRef = useRef(null);
  const [postData] = usePostApi();

  const onChangeHandler = e => {
    setBoardName(e.target.value);
  };

  const addBoard = async e => {
    e.preventDefault();
    if (boardName.length > 0) {
      const code = await postData('/board', {
        name: boardName,
      });

      if (code === 201) {
        setBoardName('');
        onClickHandler();
        setUpdate(p => !p);
      } else if (code >= 401001) {
        await getRefreshToken();
        await addBoard();
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
    <div
      className='board-el-newform'
      style={{ display: display ? 'block' : 'none' }}
    >
      <div className='board-title-newform'>
        <form onSubmit={addBoard}>
          <input
            ref={inputRef}
            placeholder='board name'
            value={boardName}
            onChange={onChangeHandler}
          />
          <button className='board-add-bt'>Add</button>
        </form>
        <button className='board-add-bt' onClick={onClickHandler}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default NewBoardForm;
