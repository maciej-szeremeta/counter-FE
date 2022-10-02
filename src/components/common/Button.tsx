/* eslint-disable react/button-has-type */
import React, { FormEvent, } from 'react';
import { Link, } from 'react-router-dom';
import styles from './Button.module.css';

interface Props{
  text: string;
  type?: 'button' | 'submit' | 'reset';
  href?: null | string;
  handleClick?:(e:FormEvent)=>void;
}
export function Button({ text, type = 'button', href = null, handleClick, }: Props) {
  if (href) {
    return (<Link
      to={href}
      className={styles.link}
    >
      {text}
    </Link>);
  } 
  return (
    <button
      type={type}
      className={styles.button}
      onClick={handleClick}
    >
      {text}
    </button>
  );
  
};
