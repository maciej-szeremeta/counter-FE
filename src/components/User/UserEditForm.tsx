/* eslint-disable function-call-argument-newline */
// ** Import Basic
import React, { ChangeEvent, FormEvent, SetStateAction, useState, } from 'react';
import { useMutation, useQuery, useQueryClient, } from 'react-query';
import { useSelector, } from 'react-redux';

// ** Import Types
import { GetOneUserRes, } from 'types';

// ** Import Variables
// ** Import Helpers
import { getOneUser, updateUser, } from '../../helpers/fetch';

// ** Import Store
import { RootState, } from '../../redux/store';

// ** Import Components
import { Button, Input, } from '../common';

// ** Import Styles
import styles from './UserEditForm.module.css';

// ** Interfaces
interface Props{
   widthRow: number;
}

export function UserEditForm({ widthRow, }:Props) {

  // ** Global States
  const userId = useSelector((state:RootState) => 
    state.user.userId);
  
  // ** Local States
  const [ email, setEmail, ] = useState('');
  const [ role, setRole, ] = useState('');
  const [ errorValid, setErrorValid, ] = useState<string[]>([]); 
  const [ errorIsExist, setErrorIsExist, ] = useState<string[]>([]); 

  // ** Api Queries
  const { isLoading, isError, } = useQuery<GetOneUserRes, Error>(
    [ 'user', userId, ], () => 
      getOneUser(userId), {
      onSuccess(data) {
        setEmail(data.user.email);
        setRole(data.user.role);
      },
      refetchOnWindowFocus: true,
      refetchOnMount      : true,
      refetchOnReconnect  : true,
    }
  );
  const queryClient = useQueryClient();
  const { isLoading:isSaving, isSuccess:isSaveSuccess, mutate, } = useMutation(
    () => 
      updateUser(
        userId, { email, role, }
      )
    , {
      onSuccess: () => {
        setEmail('');
        setRole('');
        setErrorValid([]);
        setErrorIsExist([]);
        queryClient.invalidateQueries('users');
        queryClient.invalidateQueries('user');
      },
      onError: (error: { statusCode: string; message: string[], error: string }) => {
        if(Number(error.statusCode) === 409) setErrorIsExist(error.message as SetStateAction<string[]>);
        if(Number(error.statusCode) === 400) setErrorValid(error.message as SetStateAction<string[]>);
      },
      retry: 1,
    }
  );

  // ** Handlers  
  const handleSubmit = (e: FormEvent) => { 
    e.preventDefault();
    mutate();
  };
  return (
    <tr key={userId}>
      <td
        colSpan={widthRow}
        className={styles.tableRow}>
        <div className={styles.container}>  
          <p className={styles.header}>Edycja user-a o ID : <strong>{userId}</strong></p>
          {isLoading && (<p>Loading...</p>)}
          {isSaving && (<p>Zapisywanie...</p>)}
          {isSaveSuccess && <p>Zaktualizowany ...</p>}
          {errorIsExist.length === 0 ? null : <p>{errorIsExist[ 0 ]}</p> }
          {isError && (<p>Brak połączenia z bazą</p>)}
          <form className={ styles.form }>
            <Input
              type='text'
              name='email'
              value={email}
              error={{ error: errorValid, valid: 'email', }}
              handleChange={setEmail} />
            <div className={styles.radio}>
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
                    setRole(e.target.value)}
                />
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
                    setRole(e.target.value)}
                />
          User
              </label>
              <Button
                type='submit'
                text='Zapisz'
                handleClick={handleSubmit}
              />
            </div>
          </form>
        </div>
      </td>
    </tr>
  );
};