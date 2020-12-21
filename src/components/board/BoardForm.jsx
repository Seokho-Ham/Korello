import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import apiHandler from '../../api/index';

const BoardForm = ({ url, data, setBoardCount }) => {
  const [boardId, setBoardId] = useState(data.id);
  const history = useHistory();

  const clickBoard = () => {
    history.push(`${url.slice(0, url.length - 1)}/${data.id}/cards`, {
      id: data.id,
    });
  };
  const deleteBoard = async () => {
    const res = await apiHandler('post', '/board/delete', { id: boardId });
    const { result_code } = res;
    if (result_code === 200) {
      setBoardCount(prevState => prevState - 1);
    }
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
