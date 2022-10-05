import React, { Dispatch, SetStateAction, } from 'react';
import { faArrowTrendUp, faCircleInfo, faCircleUser, faHouse, faXmark, } from '@fortawesome/free-solid-svg-icons';
import { useSelector, } from 'react-redux';
import { Icon, ListItem, } from './common';
import { List, } from './List';

import styles from './Sidebar.module.css';
import { RootState, } from '../store';

interface Props{
  handleHidden:Dispatch<SetStateAction<boolean>>
}
export function Sidebar({ handleHidden, }: Props) {
  const { id, role, } = useSelector((state:RootState) => 
    state.login.user );

  return (<>
    <div className={ styles.sidebarOpacity}/>
    <div className={styles.sidebar}>
      <div className={styles.sidebarTop} />
      <div className={styles.sidebarHeader}>
        <h2 className={styles.sidebarHeaderTitle}>Menu</h2>
        <Icon
          icon={faXmark}
          color='#000'
          handleClick={() => 
            handleHidden((value: boolean):boolean => 
              !value)}/>
      </div>
      <div className={styles.sidebarWrapper}>
        <div className={styles.sidebarMenu}>
          <h3 className={styles.sidebarSubTitle}>DashBoard</h3>
          <List className={styles.sidebarList}>
            <ListItem
              text='Home'
              icon={faHouse}
              iconSize='1.25'
              link='/'
              handleClick={() => 
                handleHidden((value: boolean):boolean => 
                  !value)}/>
            <ListItem
              text='Analityka'
              icon={faArrowTrendUp}
              iconSize='1.25'
              link='/analiz'
              handleClick={() => 
                handleHidden((value: boolean):boolean => 
                  !value)}/>
          </List>
        </div>
        {id && role === 'admin' && <div className={styles.sidebarMenu}>
          <h3 className={styles.sidebarSubTitle}>Szybkie Menu</h3>
          <List className={styles.sidebarList}>
            <ListItem
              text='Użytkownicy'
              icon={faCircleUser}
              iconSize='1.25'
              link='/users'
              handleClick={() =>
                handleHidden((value: boolean): boolean =>
                  !value)} />
            <ListItem
              text='Raporty'
              icon={faCircleInfo}
              iconSize='1.25'
              link='/users-raport'
              handleClick={() =>
                handleHidden((value: boolean): boolean =>
                  !value)} />
          </List>
        </div>}
      </div>
    </div>
  </>
  );
};