import React from 'react';
import { useHistory } from 'react-router-dom';
import { usePostApi } from '../../api/index';

const BoardForm = ({ url, data, setUpdate }) => {
  const [postData] = usePostApi();
  const history = useHistory();

  const clickBoard = () => {
    history.push(`${url.slice(0, url.length - 1)}/${data.id}/cards`, {
      id: data.id,
    });
  };
  const deleteBoard = async () => {
    const code = await postData('/board/delete', { id: data.id });
    if (code !== 200) {
      alert('삭제 실패!');
    }
    setUpdate(prevState => !prevState);
  };
  return (
    <div className='board-element'>
      <span className='board-delete-button' onClick={deleteBoard}></span>
      <div className='board-el' onClick={clickBoard}>
        <div className='board-title'>
          <p>{data.name}</p>
        </div>
      </div>
    </div>
  );
};

export default BoardForm;
