import React, { Dispatch, SetStateAction, useState, } from 'react';
import { useSelector, useDispatch, } from 'react-redux';
import { faBars, faGear, } from '@fortawesome/free-solid-svg-icons';
import { logoutUser, } from '../features/login/loginSlice';
import { Button, Icon, } from './common';
import { apiUrl, } from '../config/api';
import type { RootState, } from '../store';

import styles from './Topbar.module.css';

interface Props{
  handleHidden:Dispatch<SetStateAction<boolean>>
}
export function Topbar({ handleHidden, }:Props) {
  const user = useSelector((state:RootState) => 
    state.login.user);
  const dispatch = useDispatch();

  const [ topBarRightMenu, setTopBarRightMenu, ] = useState(false);
   
  const logout = async() => { 
    const req = await fetch(
      `${apiUrl}/auth/logout`, {
        credentials: 'include',
      }
    );
    const data = await req.json();
    if (data.msg) {
      dispatch(logoutUser());
    }
  };
  return (
    <nav className={styles.topBar}>
      <div className={styles.topBarTop} />
      <div className={styles.topBarWrapper} >
        <div className={styles.topLeft}>
          <div className={styles.topBarIconContainer}>
            <Icon
              icon={faBars}
              handleClick={() => 
                handleHidden((value: boolean):boolean => 
                  !value)} />
          </div>
          <span className={styles.logo }>Licznik</span>
        </div>
        <div className={styles.topRight}>
              Witaj {user.email}
          <div className={styles.topBarIconContainer}>
            <Icon
              icon={faGear}
              handleClick={() =>
                setTopBarRightMenu(value =>
                  !value)}/>
          </div>
          <div className={styles.topRightMenu}
            style={{ display: !topBarRightMenu ? 'none':'block', }}
          >
            <Button text='Wyloguj' handleClick={logout}/>
          </div>
        </div>
      </div>
    </nav>
  );
};
