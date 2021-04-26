import React, { useEffect } from 'react';
import RecentList from './RecentList';
import BoardForm from './BoardForm';
import NewBoardForm from './NewBoardForm';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getBoard } from './board_utils';
import { setBoardData } from '../../reducers/board.reducer';

const BoardList = () => {
  const { boardlist, loading } = useSelector(state => state.board);
  const dispatch = useDispatch();

  useEffect(() => {
    getBoard(dispatch);
  }, []);

  const renderBoards = data => {
    return data
      .sort((a, b) => Date.parse(a.createDate) - Date.parse(b.createDate))
      .map(el => {
        return <BoardForm key={el.id} data={el} />;
      });
  };

  return !loading ? (
    <>
      <Board>
        <RecentList />
        <ListType name='workspace'>
          <span></span>
          <h3>Workspace</h3>
        </ListType>
        <List>
          {renderBoards(boardlist)}
          <BoardElement>
            <NewBoardForm />
          </BoardElement>
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

export default BoardList;

export const Board = styled.div`
  background-color: #f9fafc;
  margin: 40px 15px 0px;
  width: 100%;
  max-width: 860px;
  min-width: 288px;
`;

export const ListType = styled.div`
  position: relative;
  left: 18px;
  h3 {
    display: inline-block;
    line-height: 24px;
    margin: 0px 0 0;
    font-size: 16px;
    font-weight: 700;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  span {
    background-image: url(${props =>
      props.name === 'workspace'
        ? 'https://korello.s3.ap-northeast-2.amazonaws.com/icons/workspace.png'
        : 'https://korello.s3.ap-northeast-2.amazonaws.com/icons/recent.png'});
    background-repeat: no-repeat;
    background-size: ${props => (props.name === 'workspace' ? '25px' : '27px')};
    width: 35px;
    height: 25px;
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

export const BoardElement = styled.div`
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
  background-image: url('https://korello.s3.ap-northeast-2.amazonaws.com/icons/load.gif')
  background-repeat: no-repeat;
  background-size: 130px;
  width: 130px;
  height: 130px;
`;
