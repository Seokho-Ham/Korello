import React, { useEffect } from 'react';
import queryString from 'query-string';
import { setAccessToken, initializeUser, getRefreshToken } from '../api/index';
import { Redirect, useHistory } from 'react-router-dom';
// import cookie from 'react-cookie';

const LoginPage = () => {
  let history = useHistory();
  console.log('다녀감!');
  let login = localStorage.getItem('loginStatus');

  const firstLogin = () => {
    console.log('first Login');
    localStorage.setItem(
      'accessToken',
      queryString.parse(window.location.search).accessToken,
    );
    localStorage.setItem(
      'refreshToken',
      queryString.parse(window.location.search).refreshToken,
    );

    setAccessToken(queryString.parse(window.location.search).accessToken);
    localStorage.setItem('loginStatus', true);
  };
  useEffect(async () => {
    let data = localStorage.getItem('refreshToken');

    if (data !== null) {
      let result = await initializeUser();
      console.log(result);
      if (result) {
        history.push('/boards');
      } else {
        alert('dd');
        history.push('/');
      }
    }
    if (
      queryString.parse(window.location.search).accessToken !== undefined &&
      queryString.parse(window.location.search).refreshToken !== undefined
    ) {
      firstLogin();
      console.log('login 끝!');
      history.push('/boards');
    }
  }, []);

  return (
    <div className='login-page'>
      <div className='login-header'>
        <span className='login-title-image'></span>
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
