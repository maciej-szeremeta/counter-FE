import React from 'react';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { IconProp, } from '@fortawesome/fontawesome-svg-core';
import styles from './Icon.module.css';

interface Props{
   icon: IconProp;
  color?: string;
  className?: string;
  size?: string;
  handleClick?:() => void;
}

export function Icon({ icon,
  color = '#fff',
  size = '1.5',
  handleClick,
  className, }: Props) {
  return (
    <FontAwesomeIcon
      className={styles.icon}
      icon={icon}
      style={{ color, height: `${size}rem`, width: `${size}rem`, }}
      onClick={ handleClick } />
  );
};