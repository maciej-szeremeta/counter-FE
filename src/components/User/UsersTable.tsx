// ** Import Basic
import React, { useMemo, useState, } from 'react';
import { useQuery, } from 'react-query';
import { useDispatch, } from 'react-redux';
import Modal from 'react-modal';

// ** Import Types
import { GetAllUsersRes, } from 'types';

// ** Import Variables
// ** Import Helpers
import { getUsers, } from '../../helpers/fetch';

// ** Import Store
import { openModal, } from '../../redux/open/openSlice';
import { setUserId, } from '../../redux/user/userSlice';

// ** Import Components
import { Button, } from '../common';
import { UserTableRow, } from './UserTableRow';
import { UserEditForm, } from './UserEditForm';

// ** Import Styles
import styles from './UsersTable.module.css';

// ** Interfaces

Modal.setAppElement('#root');
export function UsersTable() {

  // ** Global States
  const dispatch = useDispatch();
  
  // ** Local States
  const [ visibleOneUser, setVisibleOneUser, ] = useState<string | null>('');
  const [ visibleEditUser, setVisibleEditUser, ] = useState<string | null>('');

  // ** Api Queries
  const { isLoading, isError, error, data, } = useQuery<GetAllUsersRes, Error>(
    [ 'users', ], getUsers, {
      initialData         : [],
      refetchOnWindowFocus: true,
      refetchOnMount      : true,
      refetchOnReconnect  : true,
    }
  );  

  // ** Memo Data
  const columns= useMemo(
    () =>
      ([ { header: 'id', label: 'Lp.', },
        { header: 'email', label: 'Email', },
        { header: 'role', label: 'Role', },
        { header: 'currentTokenId', label: 'Zalogowany', },
        { header: 'więcej', label: 'Więcej', },
        { header: 'edit', label: 'Edytuj', },
        { header: 'usuń', label: 'Usuń', },
      ]), []
  );

  const rows = useMemo(
    () =>
      (data), [ data, ]
  );

  // ** Effect
  // ** Handlers
  const isEven = (i:number) =>
    i % 2 === 0;
  
  return (<div className={ styles.userInfo }>
    {isLoading && (<p>Loading...</p>)}
    {isError && (<p>Brak połączenia z bazą: {error?.message}</p>)}
    <table className={styles.userTable} cellSpacing='0'>
      <thead>
        <tr>
          {columns.map(column => 
            (<th id={ column.header} key={column.header} className={styles.tabelHeader}>{ column.label}</th>))}
        </tr>
      </thead>
      <tbody>
        { rows?.map((
          row, i
        ) => 
          (
            <>
              <tr key={row.id} className={isEven(i + 1) ? `${styles.rowEven}` : ''}>
                <td className={`${styles.tData} ${styles.row}`}>
                  {i + 1}
                </td>
                <td className={`${styles.tData} ${styles.row}`}>
                  {row.email}
                </td>
                <td className={`${styles.tData} ${styles.row}`}>
                  {row.role}
                </td>
                <td className={`${styles.tData} ${styles.row}`}>
                  {row.currentTokenId ? 'Tak' : ''}
                </td>
                <td className={`${styles.tData} ${styles.row}`}>
                  <span />
                  <Button
                    text={visibleOneUser ===row.id?'✕ Mniej':'✓ Więcej'}
                    handleClick={() => {
                      dispatch(setUserId(row.id));
                      setVisibleEditUser(null);
                      return visibleOneUser === row.id ? setVisibleOneUser(null) : setVisibleOneUser(row.id);
                    }}/>
                </td>
                <td className={`${styles.tData} ${styles.row}`}>
                  <Button
                    handleClick={() => {
                      dispatch(setUserId(row.id));
                      setVisibleOneUser(null);
                      return visibleEditUser === row.id ? setVisibleEditUser(null) : setVisibleEditUser(row.id);
                    }}
                    text='Edytuj'
                    type='button' />
                </td>
                <td className={`${styles.tData} ${styles.row}`}>
                  <Button
                    handleClick={() => {
                      dispatch(setUserId(row.id));
                      dispatch(openModal());
                    }}
                    text='Usuń'
                    type='button' />
                </td>
              </tr>
              {visibleOneUser === row.id? <UserTableRow
                widthRow={columns.length}
              /> : null}
              {visibleEditUser === row.id? <UserEditForm
                widthRow={columns.length}
              /> : null}
            </>))}
      </tbody>
    </table>
  </div>
  );
};
