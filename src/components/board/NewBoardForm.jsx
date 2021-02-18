import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { fetchData, postData, getRefreshToken } from '../../api';
import { add } from '../../reducers/board.reducer';
const NewBoardForm = () => {
  const [boardName, setBoardName] = useState('');
  const [display, setDisplay] = useState(false);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const addBoard = async e => {
    if (e) {
      e.preventDefault();
    }

    if (boardName.length > 0) {
      let code = await postData('/board', {
        name: boardName,
      });
      if (code === 201) {
        setBoardName('');
        onClickHandler();
        let [board, code] = await fetchData('/boards');
        let payload = {
          data: board ? board : [],
          code: code ? code : 0,
        };
        dispatch(add(payload));
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

  const onClickHandler = () => {
    setDisplay(p => !p);
  };

  const onChangeHandler = e => {
    setBoardName(e.target.value);
  };

  return (
    <>
      <div
        className='board-el-newform'
        onClick={onClickHandler}
        style={{ display: display ? 'none' : 'block' }}
      >
        <div className='board-title-newform'>
          <div>Create New Board</div>
        </div>
      </div>
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
            <button className='board-add-bt' onClick={addBoard}>
              Add
            </button>
          </form>
          <button className='board-add-bt' onClick={onClickHandler}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default NewBoardForm;
