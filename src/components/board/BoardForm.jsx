import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { usePostApi } from '../../api/index';
import randomImage from '../../api/images';

const BoardForm = ({ url, data, setUpdate }) => {
  const [postData] = usePostApi();
  const history = useHistory();
  const [image, setImage] = useState(randomImage());
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
    <div
      className='board-element'
      style={{ backgroundImage: ` url(${image}) ` }}
    >
      <span className='board-delete-button' onClick={deleteBoard}></span>
      <div className='board-el' onClick={clickBoard}>
        <div className='board-title'>
          <div>{data.name}</div>
        </div>
      </div>
    </div>
  );
};

export default BoardForm;
