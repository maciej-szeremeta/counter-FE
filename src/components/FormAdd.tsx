import React, { FormEvent, useState, } from 'react';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, } from 'react-query';
import { apiUrl, } from '../config/api';
import { Button, Input, } from './common';
import styles from './FormAdd.module.css';

interface Props{
  header: string;
  subheader?: string;
  refetch: <TPageData>(options?: RefetchOptions & RefetchQueryFilters<TPageData>) => Promise<QueryObserverResult<unknown, unknown>>;
}
export function FormAdd({ header, subheader, refetch, }: Props) {
  const [ email, setEmail, ] = useState('');
  const [ pwd, setPwd, ] = useState('');
  const [ errors, setError, ] = useState([]); 
  
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
    </form>
  );
};
