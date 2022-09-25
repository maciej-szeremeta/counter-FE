import React, { ReactNode, } from 'react';
import styles from './FormLogin.module.css';

interface Props{
  children: ReactNode;
  header: string;
  subheader?: string;
}
export function Form({ children, header, subheader, }:Props) {
  return (
    <form className={styles.form}>
      <div className={styles.headerContainer}>
        <h1 className={styles.header}>{header}</h1>
        <p className={styles.subheader}>{subheader}</p>
      </div>
      { children }
    </form>
  );
};
