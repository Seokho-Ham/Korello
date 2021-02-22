import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import randomImage from '../../api/images';
import { useDispatch } from 'react-redux';
import { postData, getRefreshToken } from '../../api';
import { getBoard } from './board_utils';

const BoardForm = ({ data }) => {
  const history = useHistory();
  const [image, setImage] = useState(randomImage());
  const dispatch = useDispatch();

  const clickBoard = () => {
    // console.log(history);
    history.push(`/board/${data.id}/cards`, {
      id: data.id,
    });
  };

  const deleteBoard = async () => {
    const code = await postData('/board/delete', { id: data.id });
    if (code === 200) {
      if (localStorage.getItem('lastView')) {
        let list = JSON.parse(localStorage.getItem('lastView'));
        let result = list.filter(el => el !== data.id);
        localStorage.setItem('lastView', JSON.stringify(result));
      }
      await getBoard(dispatch);
    } else if (code >= 401001) {
      await getRefreshToken();
      await deleteBoard();
    } else {
      alert('삭제 실패!');
    }
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

export default React.memo(BoardForm);
