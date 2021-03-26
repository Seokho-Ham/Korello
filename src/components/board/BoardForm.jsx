import React, { useState } from 'react';
import styled from 'styled-components';
import randomImage from '../../api/images';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { postData, getRefreshToken } from '../../api';
import { getBoard } from './board_utils';
import { BoardElement } from './BoardList';
import { deleteFirebaseDoc } from '../../firebase';

const BoardForm = ({ data }) => {
  const [image, setImage] = useState(randomImage());
  const history = useHistory();
  const dispatch = useDispatch();

  const clickBoard = () => {
    history.push(`/board/${data.id}/cards`, {
      id: data.id,
    });
  };

  const deleteBoard = async () => {
    const code = await postData('/board/delete', { id: data.id });
    if (code === 200) {
      if (localStorage.getItem('lastView')) {
        let list = JSON.parse(localStorage.getItem('lastView'));
        let result = list.filter(el => el !== parseInt(data.id));
        localStorage.setItem('lastView', JSON.stringify(result));
      }
      await deleteFirebaseDoc(data.id);
      await getBoard(dispatch);
    } else if (code >= 401001) {
      await getRefreshToken();
      await deleteBoard();
    } else {
      alert(code);
      alert('삭제 실패!');
    }
  };

  return (
    <BoardElement image={image}>
      <BoardDeleteButton onClick={deleteBoard}></BoardDeleteButton>
      <BoardCover onClick={clickBoard}>
        <BoardTitle>{data.name}</BoardTitle>
      </BoardCover>
    </BoardElement>
  );
};

export default React.memo(BoardForm);

const BoardDeleteButton = styled.span`
  background-image: url('https://korello.s3.ap-northeast-2.amazonaws.com/icons/cancel-icon.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 15px;
  width: 5px;
  height: 13px;
  background-color: hsla(0, 0%, 74%, 0.5);
  border: 0px;
  border-radius: 3px;
  margin-left: 3px;
  padding: 8px 15px;
  color: #172b4d;
  &:hover {
    background-color: hsla(0, 0%, 74%, 1);
  }
  float: right;
`;
const BoardCover = styled.div`
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
`;
const BoardTitle = styled.div`
  position: relative;
  width: 80%;
  top: 4px;
  left: 4px;
  font-size: 17px;
  font-weight: 500;
  overflow: hidden;
`;
