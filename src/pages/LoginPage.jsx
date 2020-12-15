import React, { useState } from 'react';
import LoginForm from '../components/user/LoginForm';
import SigninForm from '../components/user/SigninForm';

const LoginPage = () => {
  const [clicked, setClicked] = useState('login');

  const onClickLogin = () => {
    this.setState({ clicked: 'login' });
  };

  const onClickSignIn = () => {
    this.setState({ clicked: 'signin' });
  };

  return (
    <>
      <button onClick={this.onClickLogin}>Login</button>
      <button onClick={this.onClickSignIn}>SignIn</button>
      <div id='login'>
        {clicked === 'login' ? <LoginForm /> : <SigninForm />}
      </div>
    </>
  );
};

export default LoginPage;
