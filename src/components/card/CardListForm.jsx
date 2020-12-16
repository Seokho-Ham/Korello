import React from 'react';

const CardListForm = ({ title, description }) => {
  const style = {
    backgroundColor: 'aqua',
    margin: '20px',
  };
  return (
    <div style={style}>
      <div>{title}</div>
      <div>{description}</div>
    </div>
  );
};

export default CardListForm;
