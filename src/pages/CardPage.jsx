import React from 'react';
import { Redirect } from 'react-router-dom';
import CardContainer from '../components/card/CardContainer';

const CardPage = ({ location, login }) => {
  return login === 'true' ? (
    <>
      <CardContainer location={location} />
    </>
  ) : (
    <Redirect to='/' />
  );
};

export default CardPage;
