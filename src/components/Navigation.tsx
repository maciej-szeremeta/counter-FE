
import React, { Dispatch, SetStateAction, } from 'react';
import styles from './Navigation.module.css';

interface Props{
  visible:Dispatch<SetStateAction<boolean>>
}

export function Navigation({ visible, }:Props) {
  return (
    <div className={styles.navigation} >
      <button type='button'
        className={styles.addBtn}
        onClick={() => 
          visible((value: boolean):boolean => 
            !value)}>
        +
      </button>
    </div>
  );
};
