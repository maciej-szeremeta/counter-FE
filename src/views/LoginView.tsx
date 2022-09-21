import React from 'react';
import { Button, } from '../components/common/Button';
import { Form, } from '../components/Form';
import styles from './LoginView.module.css';

export function LoginView() {
  return (
    <div className={styles.loginView}>
      <Form header='Logowanie' subheader='text'>
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            type='text'
            name='login'/>
          <em className={styles.label}>element</em>
        </div>
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            type='text'
            name='login'/>
          <em className={styles.label}>element</em>
          <Button text='Zaloguj' type='submit'/>
        </div>
      </Form>
    </div>
  );
};
