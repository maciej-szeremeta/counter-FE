import React, { useState, } from 'react';
import { useSelector, useDispatch, } from 'react-redux';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faGear, } from '@fortawesome/free-solid-svg-icons';
import { logoutUser, } from '../features/login/loginSlice';
import { Button, } from './common/Button';
import { apiUrl, } from '../config/api';
import type { RootState, } from '../store';
import styles from './TopBar.module.css';

export function TopBar() {
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
    <div className={styles.topBar}>
      <div className={styles.topBarWrapper} >
        <div className={styles.topLeft}>
          <span className={styles.logo }>Licznik</span>
        </div>
        <div className={styles.topRight}>
              Witaj {user.email}
          <div className={styles.topBarIconContainer}>
            <FontAwesomeIcon
              icon={faGear}
              onClick={() => 
                setTopBarRightMenu(value => 
                  !value) } />
          </div>
          <div className={styles.topRightMenu}
            style={{ display: !topBarRightMenu ? 'none':'block', }}
          >
            <Button text='Wyloguj' handleClick={logout}/>
          </div>
        </div>
      </div>
    </div>
  );
};
