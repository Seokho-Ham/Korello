import React, { useEffect } from 'react';
import queryString from 'query-string';

import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const LoginPage = ({ login }) => {
  let history = useHistory();

  const setLoginInfo = () => {
    localStorage.setItem(
      'accessToken',
      queryString.parse(window.location.search).accessToken,
    );
    localStorage.setItem(
      'refreshToken',
      queryString.parse(window.location.search).refreshToken,
    );

    localStorage.setItem('loginStatus', true);
  };

  useEffect(() => {
    if (login === 'true') {
      history.push('/boards');
    }
    if (
      queryString.parse(window.location.search).accessToken &&
      queryString.parse(window.location.search).refreshToken
    ) {
      setLoginInfo();
      history.push('/boards');
    }
  }, []);

  return (
    <>
      
      <LoginDisplay>
        <LoginConatiner>
          <LoginInput>
            <input className='email' placeholder='email' />
            <input className='password' placeholder='password' />
            <input
              className='submit'
              type='submit'
              value='Login'
              onClick={() => {
                alert('카카오로 로그인해주세요.');
              }}
            />
          </LoginInput>
          <div style={{ marginBottom: '15px' }}>or</div>
          <a href='http://hyuki.app/oauth2/authorization/kakao'>
            <img
              src='//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg'
              width='222'
              alt='login'
            />
          </a>
          <hr />
          <h3>저희 앱은 카카오 로그인으로만 로그인이 가능합니다:)</h3>
        </LoginConatiner>
      </LoginDisplay>
    </>
  );
};

export default LoginPage;

const LoginDisplay = styled.div`
  height: 100%;
  background-color: #f9fafc;
`;
const LoginConatiner = styled.div`
  background-color: #f9fafc;
  border-radius: 3px;
  padding: 25px 40px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  height: 400px;
  max-width: 500px;
  margin: 0 auto;
  position: relative;
  top: 40px;
  text-align: center;
  .submit {
    background-color: #61bd4f;
    width: 310px;
    height: 40px;
  }
  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    width: 370px;
  }
`;
const LoginInput = styled.div`
  margin-top: 30px;
  input {
    background-color: #edeff0;
    border: 2px solid #dfe1e6;
    border-radius: 4px;
    box-shadow: none;
    width: 300px;
    height: 40px;
    margin-bottom: 20px;
    font-family: '-apple-system', BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    position: relative;
  }
`;
