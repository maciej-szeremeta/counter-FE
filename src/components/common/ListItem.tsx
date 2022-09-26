import React from 'react';
import { IconProp, } from '@fortawesome/fontawesome-svg-core';
import { Link, } from 'react-router-dom';
import styles from './ListItem.module.css';
import { Icon, } from './Icon';

interface Props{
  text: string;
  iconSize: string;
  icon: IconProp;
  link?: string
  handleClick?: ()=>void
}

export function ListItem({ text, icon, iconSize, link='/', handleClick, }:Props) {
  return (
    <li className={styles.listItem}>
      <Link to={link} className={styles.listItemLink} onClick={handleClick}>
        <Icon
          icon={icon}
          color='#000'
          className={styles.listItemIcon}
          size={iconSize}
        />
        <p className={styles.listItemText}>{ text }</p>
      </Link>
    </li>
  );
};
