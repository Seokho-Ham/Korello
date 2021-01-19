import React, { useState } from 'react';
import queryString from 'query-string';
import { setAccessToken } from '../api/index';
import { Redirect } from 'react-router-dom';

const LoginPage = ({ refreshToken }) => {
  if (queryString.parse(window.location.search).accessToken) {
    setAccessToken(queryString.parse(window.location.search).accessToken);
    refreshToken(queryString.parse(window.location.search).refreshToken);
  }

  return queryString.parse(window.location.search).accessToken ? (
    <Redirect to='/boards' />
  ) : (
    <>
      <div
        id='login'
        style={{ textAlign: 'center', height: '1200px', margin: '20px' }}
      >
        <a
          id='custom-login-btn'
          href='http://hyuki.app/oauth2/authorization/kakao'
        >
          <img
            src='//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg'
            width='222'
          />
        </a>
      </div>
    </>
  );
};

export default LoginPage;
