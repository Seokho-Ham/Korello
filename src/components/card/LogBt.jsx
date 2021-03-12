import React from 'react';
import styled from 'styled-components';
import logImage from '../../assets/img/logs.png';
const LogBt = ({ openLogHandler }) => {
  return (
    <LogButton>
      <span onClick={openLogHandler}></span>
    </LogButton>
  );
};

export default LogBt;

const LogButton = styled.div`
  display: inline-block;
  margin-left: 5px;
  span {
    display: inline-block;
    background-image: url(${logImage});
    background-size: 28px;
    width: 29px;
    height: 28px;
    border-radius: 3px;
    border: 2px solid hsla(0, 0%, 100%, 0.5);
    background-color: hsla(0, 0%, 100%, 0.5);
    cursor: pointer;
  }
`;
