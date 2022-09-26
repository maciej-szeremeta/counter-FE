import React, { ReactNode, } from 'react';
import styles from './List.module.css';

interface Props{
  children: ReactNode
  className?: string;
}

export function List({ children, className, }:Props) {
  return (
    <ul className={styles.list}>{ children }</ul>
  );
};
