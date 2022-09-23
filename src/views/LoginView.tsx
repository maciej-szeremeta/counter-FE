import React, { FormEvent, useState, } from 'react';
import { faUser, faKey, } from '@fortawesome/free-solid-svg-icons';
import { Input, } from '../components/common/Input';
import { Button, } from '../components/common/Button';
import { Form, } from '../components/Form';
import styles from './LoginView.module.css';

export function LoginView() {
  const [ login, setLogin, ] = useState('');
  const [ pwd, setPwd, ] = useState('');
  
  const handleSubmit = (e:FormEvent) => {
    e.preventDefault();
    console.log({ login, pwd, });
  };
  return (
    <div className={styles.loginView}>
      <Form header='Logowanie'>
        <Input
          type='text'
          name='login'
          icon={faUser}
          value={login}
          handleChange={setLogin} />
        <Input
          type='password'
          name='pwd'
          icon={faKey}
          value={pwd}
          handleChange={setPwd}
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
