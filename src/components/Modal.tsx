import React from 'react';
import Modal from 'react-modal';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, } from 'react-query';
import { useDispatch, useSelector, } from 'react-redux';
import { apiUrl, } from '../config/api';
import { openModal, } from '../features/open/openSlice';
import { RootState, } from '../store';
import { Button, } from './common';
import styles from './Modal.module.css';

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
interface Props{
  refetch: <TPageData>(options?: RefetchOptions & RefetchQueryFilters<TPageData>) => Promise<QueryObserverResult<unknown, unknown>>;
}
export function ModalDelete({ refetch, }: Props) {
  const modalIsOpen = useSelector((state:RootState) => 
    state.open.openModal);
  const { userId, } = useSelector((state:RootState) => 
    state.user);
  const dispatch = useDispatch();

  const handleDeleteUser = async (id: string) => {
    await fetch(
      `${apiUrl}/user/${id}`, {
        method     : 'DELETE',
        credentials: 'include',
      }
    );
    refetch();
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

        <Button text='Anuluj' handleClick={() => 
          dispatch(openModal())} />
        
        <Button text='Usuń' handleClick={() => {
          handleDeleteUser(userId);
          dispatch(openModal());
        }} />

      </div>
    </Modal>
  );
};
