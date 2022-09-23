import React, { Dispatch, SetStateAction, } from 'react';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { IconProp, } from '@fortawesome/fontawesome-svg-core';
import styles from './Input.module.css';

interface Props{
  type: 'text' | 'number' | 'password';
  name: string;
  icon?: IconProp;
  value?: string | string[] | number;
  handleChange:Dispatch<SetStateAction<string>>;
}

export function Input({ type='text', name, icon, value, handleChange, }:Props) {
  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        {icon && (<FontAwesomeIcon icon={icon} className={styles.icon} />)}
        <input
          className={styles.input}
          type={type}
          name={name}
          style={icon && { marginLeft: '0px', }}
          value={value}
          onChange={e => 
            handleChange(e.target.value)}
        />
      </div>
      <em className={styles.label}>element</em>
    </div>
  );
};
