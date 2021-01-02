import React, { useState, useEffect } from 'react';
import { useUpdateApi } from '../../api/index';

const Checklist = ({ id, data, setUpdate, percent }) => {
  const [updateData] = useUpdateApi();

  const checkboxHandler = async e => {
    const code = await updateData(`/todo/${e.target.name}/status`);
    if (code === 200) {
      setUpdate(p => !p);
    } else {
      alert('실패');
      setUpdate(p => !p);
    }
  };

  return (
    <>
      <div className='checklist-header'>
        <h4 style={{ margin: '0px 0px 5px 0px' }}>CheckList</h4>
        <div className='progress-container'>
          <div className='progress-percent'>{percent}%</div>
          <div className='progress-bar'>
            <div
              className='progress-percent-bar'
              style={{
                width: `${percent}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className='checklist- inner'>
        {data.map((el, i) => (
          <div className='checklist-item' key={i}>
            <>
              <input
                type='checkbox'
                name={el.todoId}
                checked={el.status}
                onChange={checkboxHandler}
              />
              {el.title}
            </>
          </div>
        ))}
      </div>
    </>
  );
};

export default Checklist;
