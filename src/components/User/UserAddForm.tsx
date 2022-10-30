/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable function-call-argument-newline */
// ** Import Basic
import React, { FormEvent, SetStateAction, useState, } from 'react';
import { useMutation, useQueryClient, } from 'react-query';
import { useDispatch, } from 'react-redux';

// ** Import Types
// ** Import Variables

// ** Import Helpers
import { registerUser, } from '../../helpers/fetch';

// ** Import Store
import { openForm, } from '../../redux/open/openSlice';

// ** Import Components
import { Button, Input, } from '../common';

// ** Import Styles
import styles from './UserAddForm.module.css';

// ** Interfaces
interface Props{
  header: string;
  subheader?: string;
}
export function UserAddForm({ header, subheader, }: Props) {

  // ** Global States
  const dispatch = useDispatch();

  // ** Local States
  const [ email, setEmail, ] = useState('');
  const [ pwd, setPwd, ] = useState('');
  const [ errorValid, setErrorValid, ] = useState<string[]>([]); 
  const [ errorIsExist, setErrorIsExist, ] = useState<string[]>([]); 
  
  // ** Api Queries
  const queryClient = useQueryClient();
  const { isLoading, isSuccess, mutate, } = useMutation(
    () => 
      registerUser({ email, pwd, })
    , {
      onMutate: addUser => {
        queryClient.setQueryData(
          [ 'user', ], addUser
        );
        setErrorValid([]);
        setErrorIsExist([]);
      },
      onSuccess: () => {
        setEmail('');
        setPwd('');
        setErrorValid([]);
        setErrorIsExist([]);
        queryClient.invalidateQueries('users');
      },
      onError: (error: { statusCode: string; message: string[], error: string }) => {
        if(Number(error.statusCode) === 409) setErrorIsExist(error.message as SetStateAction<string[]>);
        if(Number(error.statusCode) === 400) setErrorValid(error.message as SetStateAction<string[]>);
      },
      retry: 1,
    }
  );

  // ** Memo Data
  const handleSubmit = (e:FormEvent) => { 
    e.preventDefault();
    mutate();
  };

  // ** Effect

  // ** Handlers
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
