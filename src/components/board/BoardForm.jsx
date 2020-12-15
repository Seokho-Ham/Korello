import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
const BoardForm = props => {
  const { data, clickHandler } = props;

  return (
    <Router>
      <Link to={'/board/' + data.type}>
        <div
          style={{
            backgroundColor: data.color,
          }}
          onClick={() => {
            clickHandler(data.name);
          }}
        >
          <div>보드명 : {data.name}</div>
          <div>보드 타입 : {data.type}</div>
        </div>
      </Link>
    </Router>
  );
};

export default BoardForm;
