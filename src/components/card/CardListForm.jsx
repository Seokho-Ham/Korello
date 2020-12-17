import React, { memo } from 'react';

const CardListForm = ({ title }) => {
  const style = {
    backgroundColor: '#fff',
    borderRadius: '3px',
    margin: '20px',
    boxShadow: '0 2px 0 rgba(9,30,66,.25)',
  };
  return (
    <div style={style}>
      <h3 style={{ marginLeft: '5px' }}>{title}</h3>
      {/* <div style={{ marginLeft: '5px' }}>{description}</div> */}
    </div>
  );
};

export default memo(CardListForm);
