import React from 'react';
import { Redirect } from 'react-router-dom';
import CardList from '../components/card/CardList';

const CardPage = ({ location, login }) => {
  return login === 'true' ? (
    <>
      <CardList location={location} />
    </>
  ) : (
    <Redirect to='/' />
  );
};

export default CardPage;
