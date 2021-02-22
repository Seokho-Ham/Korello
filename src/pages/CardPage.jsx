import React from 'react';
import { Redirect } from 'react-router-dom';
import CardList from '../components/card/CardList';
// import CardContainer from '../containers/CardContainer';

const CardPage = ({ location, login }) => {
  return login === 'true' ? (
    <>
      <CardList location={location} />
      {/* <CardContainer location={location} /> */}
    </>
  ) : (
    <Redirect to='/' />
  );
};

export default CardPage;
