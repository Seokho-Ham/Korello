import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TemplateForm from '../components/template/TemplateForm';
import BoardList from '../components/board/BoardList';

const BoardPage = ({ match }) => {
  return (
    <Router>
      <Route exact path={match.path} component={BoardList} />
      <Route path={`${match.path}/:id`} component={TemplateForm} />
    </Router>
  );
};

export default BoardPage;
