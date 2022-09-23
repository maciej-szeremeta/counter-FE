import React from 'react';
import { faUser, faKey, } from '@fortawesome/free-solid-svg-icons';
import { Input, } from '../components/common/Input';
import { Button, } from '../components/common/Button';
import { Form, } from '../components/Form';
import styles from './LoginView.module.css';

export function LoginView() {
  return (
    <div className={styles.loginView}>
      <Form header='Logowanie'>
        <Input
          type='text'
          name='login'
          icon={faUser} />
        <Input
          type='password'
          name='pwd'
          icon={faKey} />
        <Button
          text='Zaloguj'
          type='submit'
        />
      </Form>
    </div>
  );
};
