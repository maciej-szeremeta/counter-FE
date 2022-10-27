import React from 'react';

import { GetOneUsersRes, } from 'types';
import styles from './UserTabelRow.module.css';

interface Props{
   widthRow: number;
   userID: GetOneUsersRes
}

export function UserTableRow({ widthRow, userID, }:Props) {

  return (
    <tr >
      <td
        colSpan={widthRow}
        className={styles.tableRow}>
        <div className={styles.container}>  
          <p>{userID.user.id}</p>
          <p>{userID.user.email}</p>
          <p>{userID.user.role}</p>
        </div>
      </td>
    </tr>
  );
};
