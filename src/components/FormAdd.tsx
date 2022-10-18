import React, { FormEvent, useEffect, useState, } from 'react';
import { useMutation, useQueryClient, } from 'react-query';
import { useDispatch, } from 'react-redux';
import { apiUrl, } from '../config/api';
import { Button, Input, } from './common';
import styles from './FormAdd.module.css';
import { openForm, } from '../features/open/openSlice';

interface Props{
  header: string;
  subheader?: string;
}
export function FormAdd({ header, subheader, }: Props) {
 
  const dispatch = useDispatch();
  
  const [ email, setEmail, ] = useState('');
  const [ pwd, setPwd, ] = useState('');
  const [ errorValid, setErrorValid, ] = useState([]); 
  const [ errorIsExist, setErrorIsExist, ] = useState([]); 
  
  const queryClient = useQueryClient();

  const { isLoading, isSuccess, mutate, } = useMutation(
  
    async () => {
      const req = await fetch(
        `${apiUrl}/user/register-user`, {
          method     : 'POST',
          headers    : { 'Content-Type': 'application/json', },
          credentials: 'include',
          body       : JSON.stringify({ email, pwd, }),
        }
      );
      if (req.status === 400) {
        setErrorValid((await req.json()).message);
      }
      else if (req.status === 409) {
        setErrorIsExist((await req.json()).message);
      }
 
      return req.json();
      
    }, {
      onMutate: addUser => {
        queryClient.setQueryData(
          [ 'user', ], addUser
        );
        setErrorValid([]);
      },
      onSuccess: () => {
        setEmail('');
        setPwd('');
        setErrorValid([]);
        setErrorIsExist([]);
        queryClient.invalidateQueries('user');
      },
    }
  );

  const handleSubmit = (e:FormEvent) => { 
    e.preventDefault();
    mutate();
  };

  useEffect(
    () => {
      setTimeout(
        () => {
          setErrorIsExist([]);
        }, 10000
      );
    }, [ errorIsExist, ]
  );

  return (<>
    {isLoading && <p>Zapisywanie..</p>}
    {isSuccess && <p>Dodany ...</p>}
    {errorIsExist.length === 0 ? null : <p>{errorIsExist[ 0 ]}</p> }
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
        error={{ error: errorValid, valid: 'email', }} />
      <Input
        type='password'
        name='pwd'
        value={pwd}
        placeholder='Hasło'
        handleChange={setPwd}
        error={{ error: errorValid, valid: 'hasło', }}
      />

      {/* {userId && <div className={styles.radio}>
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
      </div>} */}

      <div className={styles.buttonGroup}>
        <Button
          text='Anuluj'
          type='button'
          handleClick={() => {
            dispatch(openForm());
          }}
        />
        <Button
          text='Zapisz'
          type='submit'
          handleClick={ handleSubmit}
        />
      </div>
    </form>
  </>
  );
};
