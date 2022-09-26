import React from 'react';
import { IconProp, } from '@fortawesome/fontawesome-svg-core';
import styles from './ListItem.module.css';
import { Icon, } from './Icon';

interface Props{
  text: string;
  iconSize: string;
  icon: IconProp;
}
export function ListItem({ text, icon, iconSize, }:Props) {
  return (
    <li className={styles.listItem}>
      <Icon icon={icon} color='#000' className={styles.listItemIcon} size={iconSize }
      />
      <p className={styles.listItemText}>{text }</p>
    </li>
  );
};
