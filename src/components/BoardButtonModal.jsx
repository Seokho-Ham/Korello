import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getBoardList } from './board/board_utils';

const BoardButtonModal = ({ boardButton, setBoardButton }) => {
  const { boardlist } = useSelector(state => state.board);
  const { currentBoardId } = useSelector(state => state.card);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  const pageClickEvent = e => {
    if (
      dropdownRef.current !== null &&
      !dropdownRef.current.contains(e.target)
    ) {
      setBoardButton(!boardButton);
    }
  };
  useEffect(() => {
    if (boardlist.length === 0) {
      getBoardList(dispatch);
    }
  }, []);

  useEffect(() => {
    if (boardButton) {
      window.addEventListener('click', pageClickEvent);
    }
    return () => {
      window.removeEventListener('click', pageClickEvent);
    };
  }, [boardButton]);

  const renderBoardList = () => {
    return boardlist.map(el => {
      return el.id.toString() === currentBoardId ? (
        <BoardElement className='nav-modal-element' key={el.id} id={el.id}>
          <ElementLink href={`/board/${el.id}/cards`} id={el.id}>
            <div>{el.name}</div>
          </ElementLink>
        </BoardElement>
      ) : (
        <BoardElement className='nav-modal-element' key={el.id}>
          <ElementLink href={`/board/${el.id}/cards`}>
            <div>{el.name}</div>
          </ElementLink>
        </BoardElement>
      );
    });
  };
  return (
    <BoardButtonContainer className='boardModal' ref={dropdownRef}>
      <div style={{ fontWeight: 'bold' }}>BoardList</div>
      <hr />
      <BoardModalList>{renderBoardList()}</BoardModalList>
    </BoardButtonContainer>
  );
};

export default BoardButtonModal;

const BoardButtonContainer = styled.div`
  width: 250px;
  height: 400px;
  display: block;
  position: absolute;
  top: 43px;
  left: 1px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 3px;
  margin-left: 5px;
  padding: 25px 8px;
  z-index: 22;
`;
const BoardModalList = styled.div`
  overflow: scroll;
  height: 90%;
`;

const BoardElement = styled.div`
  height: 33px;
  text-align: center;
  border-radius: 4px;
  margin: 5px 0px;
  background-color: ${props => (props.id ? '#026aa7' : 'none')};

  :hover {
    background-color: ${props =>
      props.id ? '#015180' : 'hsla(0, 0%, 74%, 0.5)'};
  }
`;

const ElementLink = styled.a`
  border: 0;
  position: relative;
  top: 7px;
  color: ${props => (props.id ? '#fff' : '#172b4d')};
  background-color: rgba(255, 255, 255, 0.3);
  &:hover {
    opacity: 0.5;
  }
`;
