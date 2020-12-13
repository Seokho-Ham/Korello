import React, { Component } from 'react';
import Login from './Login';

class Home extends Component {
  state = {
    //로그인 여부
    login: false,
  };
  render() {
    const { login } = this.state;
    return login ? <div></div> : <Login />;
  }
}

export default Home;
