import React from 'react';
import { faAdd, faCircleInfo, faCirclePlus, faCircleUser, faFileArchive, faXmark, } from '@fortawesome/free-solid-svg-icons';
import { Icon, ListItem, } from './common';
import styles from './Sidebar.module.css';

export function Sidebar() {
  return (<>
    <div className={ styles.sidebarOpacity}/>
    <div className={styles.sidebar}>
      <div className={styles.sidebarTop} />
      <div className={styles.sidebarHeader}>
        <h2 className={styles.sidebarHeaderTitle}>Menu</h2>
        <Icon icon={faXmark} color='#000' />
      </div>
      <div className={styles.sidebarWrapper}>
        <div className={styles.sidebarMenu}>
          <h3 className={styles.sidebarSubTitle}>Szybkie Menu</h3>
          <ul className={styles.sidebarList}>
            <ListItem text='Użytkownicy' icon={faCircleUser} iconSize='1.25' />
            <ListItem text='Raporty' icon={ faCircleInfo} iconSize='1.25' />
            <ListItem text='Test' icon={ faCirclePlus } iconSize='1.25' />
          </ul>
        </div>
      </div>
    </div>
  </>
  );
};