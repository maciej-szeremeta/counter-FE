import React, { Dispatch, SetStateAction, } from 'react';
import Modal from 'react-modal';
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
   visible: boolean;
   setVisible: Dispatch<SetStateAction<boolean>>;
  deleteId: string;
  handleClick:(id:string)=>void
}
export function ModalDelete({ visible, setVisible, deleteId, handleClick, }:Props) {
  return (
    <Modal
      isOpen={visible}
      onRequestClose={() => 
        setVisible(false)}
      style={customStyles}
      contentLabel='Example Modal'>
      <h1>Modalek</h1>
      <p>Czy chcesz usunąć {deleteId}</p>
      <Button text='Anuluj' handleClick={() => 
        setVisible(false)} />
      <Button text='Usuń' handleClick={() => {
        handleClick(deleteId);
        setVisible(false);
      }} />
    </Modal>
  );
};
