
import React from 'react';
import { useDispatch, } from 'react-redux';

import { openForm, } from '../redux/open/openSlice';

import styles from './Navigation.module.css';

export function Navigation() {
  
  const dispatch = useDispatch();

  return (
    <div className={styles.navigation} >
      <button type='button'
        className={styles.addBtn}
        onClick={() => 
          dispatch(openForm())}>
        +
      </button>
    </div>
  );
};
