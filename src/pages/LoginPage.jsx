import React, { useState } from 'react';
import LoginForm from '../components/user/LoginForm';
// import SigninForm from '../components/user/SigninForm';

const LoginPage = props => {
  const { handler } = props;

  // const onClickSignIn = () => {
  //   setClicked('signin');
  // };

  return (
    <>
      {/* <button onClick={onClickSignIn}>SignIn</button> */}
      <div
        id='login'
        style={{ textAlign: 'center', height: '1200px', margin: '20px' }}
      >
        {/* {clicked === 'login' ? <LoginForm handler={handler} /> : <SigninForm />} */}
        {/* <LoginForm handler={handler} /> */}
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
