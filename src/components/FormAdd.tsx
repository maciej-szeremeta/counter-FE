import React, { ChangeEvent, FormEvent, useEffect, useState, } from 'react';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, useQuery, } from 'react-query';
import { useDispatch, useSelector, } from 'react-redux';
import { GetOneUsersRes, } from 'types';
import { RootState, } from '../store';
import { apiUrl, } from '../config/api';
import { Button, Input, } from './common';
import styles from './FormAdd.module.css';
import { openForm, } from '../features/open/openSlice';
import { setUserId, } from '../features/user/userSlice';

interface Props{
  header: string;
  subheader?: string;
  refetch: <TPageData>(options?: RefetchOptions & RefetchQueryFilters<TPageData>) => Promise<QueryObserverResult<unknown, unknown>>;
}
export function FormAdd({ header, subheader, refetch, }: Props) {

  const { userId, } = useSelector((state:RootState) => 
    state.user);
  
  const dispatch = useDispatch();
  
  const [ email, setEmail, ] = useState('');
  const [ pwd, setPwd, ] = useState('');
  const [ role, setRole, ] = useState('');
  const [ errors, setError, ] = useState([]); 
  
  useQuery<GetOneUsersRes, Error>(
    [ 'user', ], async ():Promise<GetOneUsersRes> => {
      const res = await fetch(
        `${apiUrl}/user/${userId}`, {
          credentials: 'include',
        }
      );
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      if (userId) {
        setEmail(data.user.email);
        setRole(data.user.role);
      }
      return data;
    }
  );
 
  const addUser = async (e:FormEvent) => {
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

  const saveEditUser = (e: FormEvent) => {
    e.preventDefault();
    console.log('save edit');
  };

  return (
    <form className={styles.form}>
      <div className={styles.headerContainer}>
        <h1 className={styles.header}>{header}</h1>
        <p className={styles.subheader}>{subheader}</p>
      </div>
      <Input
        type='text'
        name='email'
        value={email}
        placeholder='Email'
        handleChange={setEmail}
        error={{ error: errors, valid: 'email', }} />
      {!userId && <Input
        type='password'
        name='pwd'
        value={pwd}
        placeholder='Hasło'
        handleChange={setPwd}
        error={{ error: errors, valid: 'hasło', }}
      />}

      {userId && <div className={styles.radio}>
        <label
          htmlFor='admin'
          className={styles.radioLabel}>
          <input
            className={styles.radioInput}
            type='radio'
            value='admin'
            name='role'
            id='admin'
            checked={role === 'admin'}
            onChange={(e: ChangeEvent<HTMLInputElement>) => 
              setRole(e.target.value)} />
          Admin
        </label>
        <label
          htmlFor='user'
          className={styles.radioLabel}>
          <input
            className={styles.radioInput}
            type='radio'
            value='user'
            name='role'
            id='user'
            checked={role === 'user'}
            onChange={(e: ChangeEvent<HTMLInputElement>) => 
              setRole(e.target.value)} />
          User
        </label>
      </div>}

      <div className={styles.buttonGroup}>
        <Button
          text='Anuluj'
          type='button'
          handleClick={() => {
            dispatch(setUserId(''));
            dispatch(openForm());
          }}
        />
        <Button
          text={!userId?'Dodaj':'Zapisz'}
          type='submit'
          handleClick={!userId?addUser:saveEditUser}
        />
      </div>
    </form>
  );
};
