import React, { useState, } from 'react';
import { Sidebar, Topbar, } from '../components';
import styles from './Dashboard.module.css';

const stylesMain={
  backgroundColor: '#fff',
  height         : '400px',
  borderRadius   : '2rem 2rem 0 0',
  padding        : '1rem',
};

export function DashboardView() {

  const [ sideBarMenu, setSiteBarMenu, ] = useState(false);
  console.log(sideBarMenu);
  return (<>
    <Topbar handleHidden={setSiteBarMenu } />
    <div className={styles.container}>
      {sideBarMenu && <Sidebar handleHidden={setSiteBarMenu }/>}
      <div style={{ backgroundColor: '#661fff', flex: 4, }} >
        <div className={ styles.main } style={stylesMain}>Main</div>
      </div>
    </div>
  </>
  );
};