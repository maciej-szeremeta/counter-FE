/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React, { Dispatch, SetStateAction, } from 'react';
import { IconProp, } from '@fortawesome/fontawesome-svg-core';
import styles from './Input.module.css';
import { Icon, } from './Icon';

interface Error{
  error: string[];
  valid: string;
}
interface Props{
  type: 'text' | 'number' | 'password';
  name: string;
  icon?: IconProp;
  iconColor?: string;
  value?: string | string[] | number;
  error: Error;
  handleChange:Dispatch<SetStateAction<string>>;
}

export function Input({ type = 'text', name, icon, iconColor='#000', value, error, handleChange, }: Props) {
  const messages = error?.error;
  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        {icon && (<Icon icon={icon} color={iconColor} />)}
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
      <em className={styles.label}>
        {messages.map(err => {
          if (err.toLocaleLowerCase().includes(error.valid.toLocaleLowerCase())) {
            return err;
          }
        })}
      </em>
    </div>
  );
};
