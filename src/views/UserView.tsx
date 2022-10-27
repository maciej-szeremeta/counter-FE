// ** Import Basic
import React from 'react';
import { useSelector, } from 'react-redux';

// ** Import Types

// ** Import Variables

// ** Import Helpers

// ** Import Store
import { RootState, } from '../store';

// ** Import Components
import { FormAdd, Main, ModalDelete, Navigation, UsersTable, } from '../components';

// ** Import Styles
import styles from './UserView.module.css';

// ** Interfaces
export function UserView() {

  // ** Global States
  const visibleForm = useSelector((state:RootState) => 
    state.open.openForm);

  // ** Local States

  // ** Api Queries

  // ** Memo Data
  
  // ** Handlers

  return (
    <Main>
      <div className={styles.wrapper}>
        <Navigation/>
        <div className={styles.container}>
          <div className={styles.addUserForm}>
            {visibleForm ? <FormAdd header='Dodawanie użytkownika'/>:null }
          </div>
          <UsersTable />
        </div>
      </div>
      {/* <ModalDelete refetch={ refetch } /> */}
    </Main>
  );
};