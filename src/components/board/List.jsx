import React from 'react';
import RecentList from './RecentList';
import BoardForm from './BoardForm';
import NewBoardForm from './NewBoardForm';

const List = ({ match, boardlist }) => {
  const { data } = boardlist;

  const renderBoards = () => {
    return data
      .sort((a, b) => Date.parse(a.createDate) - Date.parse(b.createDate))
      .map(el => {
        return <BoardForm key={el.id} url={match.path} data={el} />;
      });
  };

  return (
    <>
      {data.length === 0 ? (
        <div id='board-list-container'>
          <h3>Loading...</h3>
        </div>
      ) : (
        <div id='board-list-container'>
          <RecentList data={data} match={match} />
          <div className='list-type'>
            <span className='workspace'></span>
            <h3>Workspace</h3>
          </div>
          <div id='board-list'>
            {data.length > 0 ? renderBoards() : '데이터가 없습니다.'}
            <div className='board-element'>
              <NewBoardForm />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default List;
