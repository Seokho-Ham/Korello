import React, { useState, useEffect } from 'react';

const progressCalculator = data => {
  let count = 0;
  data.map(el => {
    if (el.status) {
      count++;
    }
  });
  const result = (count / data.length) * 100;
  console.log(data);
  console.log(result);
  return result;
};

const Checklist = ({ data }) => {
  const checkboxHandler = async () => {};
  const [percent, setPercent] = useState(progressCalculator(data));

  return (
    <>
      <div className='checklist-header'>
        <h4 style={{ margin: '0px 0px 5px 0px' }}>CheckList</h4>
        <div
          style={{
            position: 'relative',
            marginBottom: '6px',
            position: 'relative',
          }}
        >
          <div
            style={{
              color: '#5e6c84',
              fontSize: '11px',
            }}
          >
            {percent}%
          </div>
          <div
            className='progress-bar'
            style={{
              overflow: 'hidden',
              position: 'relative',
              height: '8px',
              backgroundColor: 'rgba(9,30,66,.08)',
              borderRadius: '50px',
            }}
          >
            <div
              className='progress-bar-percent'
              style={{
                height: '100%',
                width: `${percent}%`,
                backgroundColor: '#3333',
                // transition: 'width 1s ease-in-out',
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className='checklist- inner'>
        {data.map((el, i) => (
          <div key={i}>
            {el.status ? (
              <>
                <input
                  type='checkbox'
                  checked='true'
                  onChange={checkboxHandler}
                />
                {el.title}
              </>
            ) : (
              <>
                <input type='checkbox' onChange={checkboxHandler} />
                {el.title}
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Checklist;
