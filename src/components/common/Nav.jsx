import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
const Nav = () => {
  const onClickHandler = () => {};

  return (
    <Link to='/board'>
      <button onClick={onClickHandler}>홈</button>
    </Link>
  );
};

export default Nav;
