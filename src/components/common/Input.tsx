import React from 'react';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { IconProp, } from '@fortawesome/fontawesome-svg-core';
import styles from './Input.module.css';

interface Props{
   type: 'text' | 'number' | 'password';
   name: string;
   icon?: IconProp;
}

export function Input({ type='text', name, icon, }:Props) {
  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        {icon && (<FontAwesomeIcon icon={icon} className={styles.icon} />)}
        <input
          className={styles.input}
          type={type}
          name={name}
          style={icon && { marginLeft: '0px', }}
        />
      </div>
      <em className={styles.label}>element</em>
    </div>
  );
};
