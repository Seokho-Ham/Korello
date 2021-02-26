import React from 'react';
import { Redirect } from 'react-router-dom';
import CardList from '../components/card/CardList';
// import { db } from '../firebase';
const CardPage = ({ location, login }) => {
  // db.collection('korello')
  //   .doc('data')
  //   .get()
  //   .then(result => {
  //     const { tags } = result.data();
  //     console.log(tags);
  //   });
  return login === 'true' ? (
    <>
      <CardList location={location} />
    </>
  ) : (
    <Redirect to='/' />
  );
};

export default CardPage;
