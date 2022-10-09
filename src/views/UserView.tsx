/* eslint-disable no-sequences */
import React from 'react';
import { GetAllUsersRes, } from 'types';
import { useQuery, } from 'react-query';
import { useDispatch, useSelector, } from 'react-redux';

import { apiUrl, } from '../config/api';
import { RootState, } from '../store';

import { FormAdd, Main, ModalDelete, Navigation, UsersTable, } from '../components';

import styles from './UserView.module.css';
import { getUsers, } from '../features/user/userSlice';

export function UserView() {
  
  const visibleForm = useSelector((state:RootState) => 
    state.open.openForm);

  const dispatch = useDispatch();
  
  const { isLoading, isError, error, refetch, } = useQuery<GetAllUsersRes, Error>(
    [ 'user', ], async ():Promise<GetAllUsersRes> => {
      const res = await fetch(
        `${apiUrl}/user`, {
          credentials: 'include',
        }
      );
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();

      dispatch(getUsers(data));
      return data;
    }, {
      initialData         : [],
      refetchOnWindowFocus: true,
      refetchOnMount      : true,
      refetchOnReconnect  : true,
      
    }
  );  

  return (
    <Main>
      <div className={styles.wrapper}>
        <Navigation/>
        <div className={styles.container}>
          <div className={styles.addUserForm}>
            {visibleForm &&
              <FormAdd
                header='Dodawanie użytkownika'
                refetch={ refetch }/>}
          </div>
          <UsersTable
            className={styles.userInfo}
            getData={{ isError, isLoading, error, refetch, }}
          />
        </div>
      </div>
      <ModalDelete refetch={ refetch } />
    </Main>
  );
};