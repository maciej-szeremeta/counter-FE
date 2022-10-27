// ** Import Basic
import React from 'react';
import { useQuery, } from 'react-query';
import { useSelector, } from 'react-redux';
import { GetOneUserRes, } from 'types';

// ** Import Types
// ** Import Variables
// ** Import Helpers
import { getOneUser, } from '../../helpers/fetch';

// ** Import Store
import { RootState, } from '../../store';

// ** Import Components
// ** Import Styles
import styles from './UserTabelRow.module.css';

// ** Interfaces
interface Props{
   widthRow: number;
}

export function UserTableRow({ widthRow, }:Props) {

  // ** Global States
  const userId = useSelector((state:RootState) => 
    state.user.userId);

  // ** Local States
  // ** Api Queries
  const { isLoading, isError, error, data, } = useQuery<GetOneUserRes, Error>(
    [ 'user', userId, ], () => 
      getOneUser(userId), {
      refetchOnWindowFocus: true,
      refetchOnMount      : true,
      refetchOnReconnect  : true,
    }
  );
  return (<tr >
    {isLoading && (<p>Loading...</p>)}
    {isError && (<p>Brak połączenia z bazą</p>)}
    <td
      colSpan={widthRow}
      className={styles.tableRow}>
      <div className={styles.container}>  
        <p>{data?.user.id}</p>
        <p>{data?.user.email}</p>
        <p>{data?.user.role}</p>
      </div>
    </td>
  </tr>
  );
};
