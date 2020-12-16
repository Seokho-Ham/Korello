import React, { useState, useEffect } from 'react';
import CardForm from './CardForm';
import apiHandler from '../../api/index';
import data from '../../assets/data';
const CardList = () => {
  //데이터를 받아와서 나열.

  useEffect(() => {});

  return (
    <div>
      {data.map(el => {
        return <CardForm key={el.id} data={el} />;
      })}
    </div>
  );
};

export default CardList;
