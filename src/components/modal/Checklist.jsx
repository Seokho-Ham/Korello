import React from 'react';

const Checklist = ({ data }) => {
  const checkboxHandler = async () => {};
  return (
    <div>
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
  );
};

export default Checklist;
