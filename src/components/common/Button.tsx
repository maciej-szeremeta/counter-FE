/* eslint-disable react/button-has-type */
import React, { FormEvent, } from 'react';
import styles from './Button.module.css';

interface Props{
  text: string;
  type?: 'button' | 'submit' | 'reset';
  handleClick:(e:FormEvent)=>void;
}
export function Button({ text, type='button', handleClick, }:Props) {
  return (
    <button
      type={type}
      className={styles.button}
      onClick={handleClick }
    >
      {text}
    </button>
  );
};
