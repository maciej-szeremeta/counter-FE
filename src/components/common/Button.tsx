/* eslint-disable react/button-has-type */
import React from 'react';
import styles from './Button.module.css';

interface Props{
  text: string;
  type?: 'button' | 'submit' | 'reset';
}
export function Button({ text, type='button', }:Props) {
  return (
    <button type={type} className={styles.button}>{ text }</button>
  );
};
