import React from 'react';
import queryString from 'query-string';
import { setAccessToken } from '../api/index';
import { Redirect } from 'react-router-dom';

const LoginPage = ({ refreshToken }) => {
  if (queryString.parse(window.location.search).accessToken) {
    console.log(queryString.parse(window.location.search).accessToken);
    setAccessToken(queryString.parse(window.location.search).accessToken);
    refreshToken(queryString.parse(window.location.search).refreshToken);
  }

  return queryString.parse(window.location.search).accessToken ? (
    <Redirect to='/boards' />
  ) : (
    <div className='login-page'>
      <div className='login-header'>
        <span className='login-title'></span>
        <span className='login-name'></span>
      </div>
      <div className='login-container'>
        <div className='login-input'>
          <input className='email' placeholder='email'></input>
          <input className='password' placeholder='password'></input>
          <input
            className='submit'
            type='submit'
            value='Login'
            onClick={() => {
              alert('카카오로 로그인해주세요.');
            }}
          ></input>
        </div>
        <div style={{ marginBottom: '15px', fontFamily: '-apple-system' }}>
          or
        </div>
        <a
          id='custom-login-btn'
          href='http://hyuki.app/oauth2/authorization/kakao'
        >
          <img
            src='//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg'
            width='222'
            alt='login'
          />
        </a>
        <hr />
        <h3>저희 앱은 카카오 로그인으로만 로그인이 가능합니다:)</h3>
      </div>
    </div>
  );
};

export default LoginPage;
