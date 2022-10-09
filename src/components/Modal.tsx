import React from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector, } from 'react-redux';
import { openModal, } from '../features/open/openSlice';
import { RootState, } from '../store';
import { Button, } from './common';

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
  deleteId: string;
  handleClick:(id:string)=>Promise<void>;
}
export function ModalDelete({ deleteId, handleClick, }: Props) {
  const modalIsOpen = useSelector((state:RootState) => 
    state.open.openModal);
  const dispatch = useDispatch();
  
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => 
        dispatch(openModal())}
      style={customStyles}
      contentLabel='Example Modal'>
      <h1>Modalek</h1>
      <p>Czy chcesz usunąć {deleteId}</p>
      <Button text='Anuluj' handleClick={() => 
        dispatch(openModal())} />
      <Button text='Usuń' handleClick={() => {
        handleClick(deleteId);
        dispatch(openModal());
      }} />
    </Modal>
  );
};
