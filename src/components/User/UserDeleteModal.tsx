// ** Import Basic
import React, { FormEvent, } from 'react';
import Modal from 'react-modal';
import { useMutation, useQueryClient, } from 'react-query';
import { useDispatch, useSelector, } from 'react-redux';

// ** Import Types
import { DeletedUserRes, } from 'types';

// ** Import Variables

// ** Import Helpers
import { deleteUser, } from '../../helpers/fetch';

// ** Import Store
import { RootState, } from '../../store';
import { setUserId, } from '../../features/user/userSlice';
import { openModal, } from '../../features/open/openSlice';

// ** Import Components
import { Button, } from '../common';

// ** Import Styles
import styles from './UserDeleteModal.module.css';

// ** Interfaces
const customStyles = {
  content: {
    top        : '50%',
    left       : '50%',
    right      : 'auto',
    bottom     : 'auto',
    marginRight: '-50%',
    transform  : 'translate(-50%, -50%)',
  },
};
export function ModalDelete() {

  // ** Global States
  const dispatch = useDispatch();
  const modalIsOpen = useSelector((state:RootState) => 
    state.open.openModal);
  const { userId, } = useSelector((state:RootState) => 
    state.user);

  // ** Local States
  // ** Api Queries
  const queryClient = useQueryClient();
  const { isLoading, isError, mutate, } = useMutation<DeletedUserRes, Error>(
    [ 'user', userId, ], () => 
      deleteUser(userId), {
      onSuccess: () => {
        dispatch(setUserId(''));
        dispatch(openModal());
        queryClient.invalidateQueries('users');
      },
    }
  );

  // ** Handlers
  const handleDeleteUser = (e:FormEvent) => { 
    e.preventDefault();
    mutate();
  };
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => 
        dispatch(openModal())}
      style={customStyles}
      contentLabel='Example Modal'>
      <h1 className={styles.title}>Usówanie użytkownika !</h1>
      <p className={styles.subtitle }>Czy chcesz usunąć użytownika o numerze id : <span className={styles.userId}>{userId}</span>.</p>
      <div className={styles.buttonGroup} >

        <Button text='Anuluj' handleClick={() => {
          dispatch(setUserId(''));
          dispatch(openModal());
        }
        } />
        {isLoading && (<p>Loading...</p>)}
        {isError && (<p>Brak połączenia z bazą.</p>)}
        <Button text='Usuń' handleClick={handleDeleteUser} />
      </div>
    </Modal>
  );
};
