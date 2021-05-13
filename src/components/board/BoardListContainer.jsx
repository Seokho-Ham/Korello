import React, { useEffect } from 'react';
import RecentBoardList from './RecentBoardList';
import BoardElement from './BoardElement';
import NewBoardForm from './NewBoardForm';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getBoardList } from '../../helper/board';
import { MdAccountBox } from 'react-icons/md';

const BoardListContainer = () => {
  const { boardlist, loading } = useSelector(state => state.board);
  const dispatch = useDispatch();

  useEffect(() => {
    getBoardList(dispatch);
  }, []);

  const renderBoards = data => {
    return data
      ? data
          .sort((a, b) => Date.parse(a.createDate) - Date.parse(b.createDate))
          .map(el => {
            return <BoardElement key={el.id} data={el} />;
          })
      : '죄송합니다. 에러가 발생했습니다.';
  };

  return !loading ? (
    <>
      <Board>
        <RecentBoardList />
        <ListType name='workspace'>
          <MdAccountBox size='27' />
          <h3>Workspace</h3>
        </ListType>
        <List>
          {renderBoards(boardlist)}
          <BoardItem>
            <NewBoardForm />
          </BoardItem>
        </List>
      </Board>
    </>
  ) : (
    <>
      <Board>
        <Loading />
      </Board>
    </>
  );
};

export default BoardListContainer;

export const Board = styled.div`
  display: flex;
  flex-direction: column;

  background-color: #f9fafc;
  margin: 40px 15px 0px;
  width: 100%;
  max-width: 860px;
  min-width: 288px;
`;

export const ListType = styled.div`
  margin: 5px 0px;
  h3 {
    display: inline-block;
    line-height: 24px;
    margin: 0px 5px 0px;
    font-size: 16px;
    font-weight: 700;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-width: 288px;
  width: 860px;
  max-height: 700px;
  overflow: auto;
`;

export const BoardItem = styled.div`
  margin: 10px;
  margin-top: 20px;
  float: left;
  width: 193px;
  height: 96px;
  background-image: url(${props => props.image});
  background-repeat: no-repeat;
  background-size: 200px 100px;
  border-radius: 4px;
  cursor: pointer;
  color: #fff;
`;
const Loading = styled.span`
  display: inline-block;
  position: relative;
  top: 50px;
  left: 30%;
  background-image: url('https://korello.s3.ap-northeast-2.amazonaws.com/icons/load.gif');
  background-repeat: no-repeat;
  background-size: 130px;
  width: 130px;
  height: 130px;
`;
