import React, { ReactNode, useState, } from 'react';
import { Sidebar, } from '../Sidebar';
import { Topbar, } from '../TopBar';
import styles from './Main.module.css';

interface Props{
   children:ReactNode
}

export function Main({ children, }: Props) {
  const [ sideBarMenu, setSiteBarMenu, ] = useState(false);
  return (<>
    <Topbar handleHidden={setSiteBarMenu} />
    {sideBarMenu && <Sidebar handleHidden={setSiteBarMenu} />}
    <div className={styles.container}>
      <div className={styles.mainBackground} >
        <div className={styles.main}>
          {children}
        </div>
      </div>
    </div>
  </>
  );
};
