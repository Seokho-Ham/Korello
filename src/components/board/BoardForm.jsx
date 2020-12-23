import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { usePostApi } from '../../api/index';

const BoardForm = ({ url, data, setUpdate }) => {
  const [boardId, setBoardId] = useState(data.id);
  const [postData] = usePostApi();
  const history = useHistory();

  const clickBoard = () => {
    history.push(`${url.slice(0, url.length - 1)}/${data.id}/cards`, {
      id: data.id,
    });
  };
  const deleteBoard = async () => {
    const code = await postData('/board/delete', { id: boardId });
    if (code !== 200) {
      alert('삭제 실패!');
    }
    setUpdate(prevState => !prevState);
  };
  return (
    <div className='board-element'>
      <div
        className='board-delete'
        style={{
          float: 'right',
        }}
      >
        <button
          style={{
            border: '3px solid #d9cbb3',
            color: 'black',
          }}
          onClick={deleteBoard}
        >
          X
        </button>
      </div>
      <div className='board-title' onClick={clickBoard}>
        <>{data.name}</>
      </div>
    </div>
  );
};

export default BoardForm;
