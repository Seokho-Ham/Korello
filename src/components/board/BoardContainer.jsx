import React from 'react';
import BoardList from './BoardList';
import styled from 'styled-components';
const BoardContainer = () => {
  return (
    <Container>
      <BoardSidebar>
        <BoardNav>
          <div>
            <a href='/boards'>Boards</a>
          </div>
        </BoardNav>
      </BoardSidebar>
      <BoardList />
    </Container>
  );
};

export default BoardContainer;

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  flex: 1 1 0%;
  overflow-y: auto;
`;
const BoardSidebar = styled.div`
  position: sticky;
  width: 240px;
  height: 700px;
  margin: 40px 0px 0px;
  a {
    color: #0079bf;
    font-size: 17px;
    font-weight: 700;
    min-width: 290px;
  }
`;
const BoardNav = styled.nav`
  display: inline;
  min-width: 290px;
  div {
    background-color: #e4f0f6;
    padding: 5px;
    border-radius: 4px;
  }
`;
