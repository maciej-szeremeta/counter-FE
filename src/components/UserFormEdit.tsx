import React from 'react';

import { GetOneUsersRes, } from 'types';
import { Input, } from './common';
import styles from './UserTabelRow.module.css';

interface Props{
   widthRow: number;
   userID: GetOneUsersRes
}

export function UserFormEdit({ widthRow, userID, }:Props) {

  return (
    <tr >
      <td
        colSpan={widthRow}
        className={styles.tableRow}>
        <div className={styles.container}>  
          <p>{userID.user.id}</p>
          {/* <Input type='text' name='email' error={undefined} handleChange={ }/> */}
        </div>
      </td>
    </tr>
  );
};