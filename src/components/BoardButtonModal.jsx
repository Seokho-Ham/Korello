import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBoard } from '../containers/BoardContainer';
import { useHistory } from 'react-router-dom';
const BoardButtonModal = () => {
  const { data } = useSelector(state => state.board);
  const dispatch = useDispatch();
  const history = useHistory();
  const renderBoardList = () => {
    console.log(data);
    return data.map(el => {
      return (
        <div className='nav-modal-element' key={el.id}>
          <div
            onClick={() => {
              history.push(`/board/${el.id}/cards`);
            }}
          >
            {el.name}
          </div>
        </div>
      );
    });
  };
  return <div className='boardModal'>{renderBoardList()}</div>;
};

export default BoardButtonModal;
