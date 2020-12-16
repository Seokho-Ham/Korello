import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import apiHandler from '../../api/index';
const NewBoardForm = ({ onClickHandler }) => {
  const [boardName, setBoardName] = useState('');
  const history = useHistory();
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
        history.push('/board');
      } else {
        alert('생성에 실패했습니다.');
        setBoardName('');
      }
    } else {
      alert('이름을 입력해주세요.');
    }
  };
  return (
    <>
      <input
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
