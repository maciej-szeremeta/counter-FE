// ** Import Basic
import React from 'react';
import { useQuery, } from 'react-query';
import { useDispatch, useSelector, } from 'react-redux';

// ** Import Types
import { GetAllUsersRes, } from 'types';

// ** Import Variables
import { apiUrl, } from '../config/api';

// ** Import Helpers

// ** Import Store
import { RootState, } from '../store';
import { getUsers, } from '../features/user/userSlice';

// ** Import Components
import { FormAdd, Main, ModalDelete, Navigation, UsersTable, } from '../components';

// ** Import Styles
import styles from './UserView.module.css';

// ** Interfaces
export function UserView() {

  // ** Global States
  const dispatch = useDispatch();
  const visibleForm = useSelector((state:RootState) => 
    state.open.openForm);

  // ** Local States

  // ** Api Queries
  const { isLoading, isError, error, refetch, } = useQuery<GetAllUsersRes, Error>(
    [ 'users', ], async ():Promise<GetAllUsersRes> => {
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

  // ** Handlers
  return (
    <Main>
      <div className={styles.wrapper}>
        <Navigation/>
        <div className={styles.container}>
          <div className={styles.addUserForm}>
            {visibleForm ? <FormAdd header='Dodawanie użytkownika'/>:null }
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