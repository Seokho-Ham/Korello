import React, { memo, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const obj = {
  email: 'seokho9522@gmail.com',
  password: '1111',
};

const LoginForm = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const inputRef = useRef(null);
  const history = useHistory();

  const onChangeForm = e => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
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
      props.handler();
      history.push('/board');
    } else {
      alert('아이디 혹은 비밀번호가 올바르지 않습니다.');
      setEmail('');
      setPassword('');
      inputRef.current.focus();
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h5>아이디</h5>
        <input
          ref={inputRef}
          name='email'
          type='email'
          value={email}
          onChange={onChangeForm}
        />
        <h5>비밀번호</h5>
        <input
          name='password'
          type='password'
          value={password}
          onChange={onChangeForm}
        />
        <button>로그인</button>
      </form>
    </div>
  );
};

export default LoginForm;
