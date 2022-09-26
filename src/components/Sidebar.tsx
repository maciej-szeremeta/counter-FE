import React from 'react';
import styles from './Sidebar.module.css';

export function Sidebar() {
  return (<>
    <div className={ styles.sidebarOpacity}/>
    <div className={styles.sidebar}>
      <div className={styles.sidebarTop} />
      <div className={styles.sidebarWrapper}>
        <div className={styles.sidebarMenu}>
          <h3 className={styles.sidebarTitle}>Menu</h3>
          <ul className={styles.sidebarList}>
            <li className={styles.sidebarListItem}>
              Home
            </li>
          </ul>
        </div>
      </div>
    </div>
  </>
  );
};