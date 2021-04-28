import React from 'react';
import styled from 'styled-components';
import { MdMenu } from 'react-icons/md';
const LogBt = ({ openLogHandler }) => {
  return (
    <LogButton>
      <MdMenu onClick={openLogHandler} size='28' />
    </LogButton>
  );
};

export default LogBt;

const LogButton = styled.div`
  display: inline-block;
  margin-left: 5px;
  svg {
    border: 2px solid hsla(0, 0%, 100%, 0.5);
    border-radius: 4px;
    background-color: hsla(0, 0%, 100%, 0.5);
    cursor: pointer;
  }
`;
