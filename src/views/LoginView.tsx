import React, { FormEvent, useState, } from 'react';
import { faUser, faKey, } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, } from 'react-redux';
import { loginUser, } from '../features/login/loginSlice';
import { apiUrl, } from '../config/api';

import { Input, } from '../components/common/Input';
import { Button, } from '../components/common/Button';
import { Form, } from '../components/Form';

import styles from './LoginView.module.css';

export function LoginView() {
  const dispatch = useDispatch();

  const [ email, setEmail, ] = useState('');
  const [ pwd, setPwd, ] = useState('');
  const [ error, setError, ] = useState([]); 
  
  const handleSubmit = async (e:FormEvent) => {
    e.preventDefault();

    const req = await fetch(
      `${apiUrl}/auth/login`, {
        method     : 'POST',
        headers    : { 'Content-Type': 'application/json', },
        credentials: 'include',
        body       : JSON.stringify({ email, pwd, }),
      }
    );

    const data = await req.json();

    if (data.statusCode === 400) {
      setError(data.message);
    }
    else {
      dispatch(loginUser(data));
      setEmail('');
      setPwd('');
      setError([]);
    }
  };
  return (
    <div className={styles.loginView}>
      <Form header='Logowanie'>
        <Input
          type='text'
          name='email'
          icon={faUser}
          value={email}
          handleChange={setEmail}
          error={{ error, valid: 'email', }} />
        <Input
          type='password'
          name='pwd'
          icon={faKey}
          value={pwd}
          handleChange={setPwd}
          error={{ error, valid: 'hasło', }}
        />
        <Button
          text='Zaloguj'
          type='submit'
          handleClick={handleSubmit}
        />
      </Form>
    </div>
  );
};
