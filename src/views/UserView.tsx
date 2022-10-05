/* eslint-disable no-sequences */
import React, { FormEvent, useState, } from 'react';
import { GetAllUsersRes, } from 'types';
import { useQuery, } from 'react-query';
import { Button, Input, } from '../components/common';
import { FormAdd, Main, Navigation, UsersTable, } from '../components';
import styles from './UserView.module.css';
import { apiUrl, } from '../config/api';

export function UserView() {
  const [ visibleForm, setVisibleForm, ] = useState(false);
  
  const [ email, setEmail, ] = useState('');
  const [ pwd, setPwd, ] = useState('');
  const [ errors, setError, ] = useState([]); 
  
  const [ users, setUsers, ] = useState<GetAllUsersRes|[]>([]);
  
  const { isLoading, isError, error, refetch, } = useQuery<GetAllUsersRes, Error>(
    'user', async ():Promise<GetAllUsersRes> => {
      const res = await fetch(
        `${apiUrl}/user`, {
          credentials: 'include',
        }
      );
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();

      setUsers( data);
      return data;
    }
  );
  
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
      refetch();
    }
  };

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
                  placeholder='Email'
                  handleChange={setEmail}
                  error={{ error: errors, valid: 'email', }} />
                <Input
                  type='password'
                  name='pwd'
                  value={pwd}
                  placeholder='Hasło'
                  handleChange={setPwd}
                  error={{ error: errors, valid: 'hasło', }}
                />
                <Button
                  text='Dodaj'
                  type='submit'
                  handleClick={handleSubmit}
                />
              </FormAdd>}
          </div>
          <UsersTable className={styles.userInfo} getData={{ isError, isLoading, error, refetch, users, } } />
        </div>
      </div>
    </Main>
  );
};