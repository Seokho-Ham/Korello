import React from 'react';
import ChecklistForm from './ChecklistForm';

const Checklist = ({ id, data, setUpdate, percent }) => {
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
          <ChecklistForm key={i} el={el} setUpdate={setUpdate} />
        ))}
      </div>
    </>
  );
};

export default Checklist;
