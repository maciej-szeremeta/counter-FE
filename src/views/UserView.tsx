import React, { FormEvent, useState, } from 'react';
import { Button, Input, } from '../components/common';
import { FormAdd, Main, Navigation, UsersTable, } from '../components';
import styles from './UserView.module.css';
import { apiUrl, } from '../config/api';

export function UserView() {
  const [ email, setEmail, ] = useState('');
  const [ pwd, setPwd, ] = useState('');
  const [ error, setError, ] = useState([]); 
  
  const handleSubmit = async (e:FormEvent) => {
    e.preventDefault();

    const req = await fetch(
      `${apiUrl}/user/register-user`, {
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
      setEmail('');
      setPwd('');
      setError([]);
    }
  };
  
  const [ visibleForm, setVisibleForm, ] = useState(true);
  return (
    <Main>
      <div className={styles.wrapper}>
        <Navigation visible={setVisibleForm} />
        <div className={styles.container}>
          <div className={styles.addUserForm}>
            {visibleForm &&
              <FormAdd header='Dodawanie użytkownika'>
                <Input
                  type='text'
                  name='email'
                  value={email}

                  // placeholder='Email'
                  handleChange={setEmail}
                  error={{ error, valid: 'email', }} />
                <Input
                  type='password'
                  name='pwd'
                  value={pwd}

                  // placeholder='Hasło'
                  handleChange={setPwd}
                  error={{ error, valid: 'hasło', }}
                />
                <Button
                  text='Dodaj'
                  type='submit'
                  handleClick={handleSubmit}
                />
              </FormAdd>}
          </div>
          <UsersTable className={styles.userInfo}/>
        </div>
      </div>
    </Main>
  );
};