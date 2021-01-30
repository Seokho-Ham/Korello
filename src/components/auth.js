import React, { useEffect } from 'react';
import { initializeUser } from '../api/index';
import { useHistory } from 'react-router-dom';

const auth = async () => {
  let loginStatus = localStorage.getItem('loginStatus');

  if (loginStatus === 'true') {
    let loginState = await initializeUser();
    if (loginState) {
      return true;
    } else {
      return false;
    }
  }
};

export default auth;
