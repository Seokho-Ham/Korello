import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import randomImage from '../../api/images';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postData, getRefreshToken } from '../../api';
import { BoardItem } from './BoardListContainer';
import { deleteFirebaseDoc } from '../../firebase';
import { boardActions } from '../../reducers/board.reducer';
import { BiX } from 'react-icons/bi';
const BoardElement = ({ data }) => {
  const [image, setImage] = useState(randomImage());
  const history = useHistory();
  const dispatch = useDispatch();
  const { boardlist, recentBoard } = useSelector(state => state.board);

  const clickBoard = () => {
    history.push(`/board/${data.id}/cards`, {
      id: data.id,
    });
  };

  const deleteBoard = useCallback(async () => {
    if (window.confirm('보드를 삭제하시겠습니까?')) {
      const [responseData, code] = await postData('/board/delete', {
        id: data.id,
      });

      if (code === 200) {
        if (localStorage.getItem('lastView')) {
          let list = JSON.parse(localStorage.getItem('lastView'));
          let result = list.filter(el => el !== parseInt(data.id));
          localStorage.setItem('lastView', JSON.stringify(result));
        }
        deleteFirebaseDoc(data.id);
        dispatch(
          boardActions.setBoardData({
            boardlist: boardlist.filter(el => el.id !== data.id),
            recentBoard: recentBoard.filter(el => el.id !== data.id),
          }),
        );
      } else if (code >= 401001) {
        await getRefreshToken();
        await deleteBoard();
      } else {
        alert(code);
        alert('삭제 실패!');
      }
    }
  }, [boardlist]);

  return (
    <BoardItem image={image}>
      <BoardDeleteButton onClick={deleteBoard}>
        <BiX size='30' />
      </BoardDeleteButton>
      <BoardCover onClick={clickBoard}>
        <BoardTitle>{data.name}</BoardTitle>
      </BoardCover>
    </BoardItem>
  );
};

export default React.memo(BoardElement);

const BoardDeleteButton = styled.span`
  background-size: 15px;
  width: 0.5px;
  height: 12px;
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
  svg {
    position: relative;
    right: 15px;
    bottom: 7px;
  }
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
