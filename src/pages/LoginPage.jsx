import React, { useState } from 'react';
import LoginForm from '../components/user/LoginForm';
import SigninForm from '../components/user/SigninForm';

const LoginPage = props => {
  const { handler } = props;
  const [clicked, setClicked] = useState('login');

  const onClickLogin = () => {
    setClicked('login');
  };

  const onClickSignIn = () => {
    setClicked('signin');
  };

  return (
    <>
      <button onClick={onClickLogin}>Login</button>
      {/* <button onClick={onClickSignIn}>SignIn</button> */}
      <div id='login'>
        {/* {clicked === 'login' ? <LoginForm handler={handler} /> : <SigninForm />} */}
        <LoginForm handler={handler} />
      </div>
    </>
  );
};

export default LoginPage;
