import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { usePostApi } from '../../api/index';

const BoardForm = ({ url, data, setUpdate }) => {
  const [boardId, setBoardId] = useState(data.id);
  const [postData] = usePostApi('/board/delete', { id: boardId });
  const history = useHistory();

  const clickBoard = () => {
    history.push(`${url.slice(0, url.length - 1)}/${data.id}/cards`, {
      id: data.id,
    });
  };
  const deleteBoard = async () => {
    const code = await postData();
    if (code !== 200) {
      alert('삭제 실패!');
    }
    setUpdate(prevState => !prevState);
  };
  return (
    <div id='board-element'>
      <div
        id='board-delete'
        style={{
          float: 'right',
          // margin: '320px 70px',
        }}
      >
        <button
          style={{
            // padding: '25px 40px',
            // margin: '320px 70px',
            border: '3px solid #d9cbb3',
            color: 'black',
          }}
          onClick={deleteBoard}
        >
          X
        </button>
      </div>
      <div id='board-title' onClick={clickBoard}>
        <>{data.name}</>
      </div>
    </div>
  );
};

export default BoardForm;
