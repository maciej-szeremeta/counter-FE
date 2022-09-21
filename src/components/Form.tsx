import React, { ReactNode, } from 'react';
import styles from './Form.module.css';

interface Props{
  children: ReactNode;
  header: string;
  subheader?: string;
}
export function Form({ children, header, subheader, }:Props) {
  return (
    <form className={styles.form}>
      <h1 className={styles.formHeader}>{header}</h1>
      <p className={styles.formSubheader}>{subheader}</p>
      { children }
    </form>
  );
};
