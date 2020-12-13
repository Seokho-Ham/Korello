import React, { Component } from 'react';
import LoginForm from '../components/user/LoginForm';
import SigninForm from '../components/user/SigninForm';

class Login extends Component {
  state = {
    clicked: 'login',
  };

  onClickLogin = () => {
    this.setState({ clicked: 'login' });
  };

  onClickSignIn = () => {
    this.setState({ clicked: 'signin' });
  };

  render() {
    const { clicked } = this.state;
    return (
      <>
        <button onClick={this.onClickLogin}>Login</button>
        <button onClick={this.onClickSignIn}>SignIn</button>
        <div id='login'>
          {clicked === 'login' ? <LoginForm /> : <SigninForm />}
        </div>
      </>
    );
  }
}

export default Login;
