import React from 'react';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { IconProp, } from '@fortawesome/fontawesome-svg-core';
import styles from './Icon.module.css';

interface Props{
   icon: IconProp;
  color?: string;
  handleClick?:() => void;
}

export function Icon({ icon, color='#fff', handleClick, }:Props) {
  return (
    <FontAwesomeIcon
      className={styles.icon}
      icon={icon}
      style={{ color, }}
      onClick={ handleClick } />
  );
};