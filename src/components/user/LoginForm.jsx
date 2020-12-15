import React, { memo, useState, useRef } from 'react';
import axios from 'axios';

const obj = {
  email: 'seokho9522@gmail.com',
  password: '1111',
};

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const inputRef = useRef(null);

  const onChangeForm = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = e => {
    e.preventDefault();
    // axios
    //   .post('https://222.117.225.28:8080', {
    //     email: this.state.email,
    //     password: this.state.password,
    //   })
    //   .then(res => {});
    if (email === obj.email && password === obj.password) {
    } else {
      alert('아이디 혹은 비밀번호가 올바르지 않습니다.');
      setEmail('');
      setPassword('');
      inputRef.current.focus();
    }
  };

  return (
    <div>
      <form onSubmit={this.onSubmit}>
        <h5>아이디</h5>
        <input
          ref={inputRef}
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
};

export default LoginForm;
