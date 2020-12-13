import React, { Component } from 'react';

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
  };
  onChangeForm = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onSubmit = e => {
    e.preventDefault();
  };
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <h5>아이디</h5>
          <input
            name='email'
            type='email'
            value={this.state.email}
            onChange={this.onChangeForm}
          />
          <h5>비밀번호</h5>
          <input
            name='password'
            type='password'
            value={this.state.password}
            onChange={this.onChangeForm}
          />
          <button>로그인</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
