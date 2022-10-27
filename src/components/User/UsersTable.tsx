/* eslint-disable @typescript-eslint/no-unused-vars */
// ** Import Basic
import React, { useEffect, useMemo, useState, } from 'react';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, useQuery, } from 'react-query';
import { useDispatch, useSelector, } from 'react-redux';
import Modal from 'react-modal';

// ** Import Types
// ** Import Variables
import { apiUrl, } from '../../config/api';

// ** Import Helpers
// ** Import Store
import { RootState, } from '../../store';
import { openForm, openModal, } from '../../features/open/openSlice';
import { setUserId, } from '../../features/user/userSlice';

// ** Import Components
import { Button, } from '../common';
import { UserTableRow, } from '../UserTableRow';

// ** Import Styles
import styles from './UsersTable.module.css';

Modal.setAppElement('#root');

// ** Interfaces
interface GetData {
  isError: boolean;
  isLoading: boolean;
  error: Error | null;
  refetch: <TPageData>(options?: RefetchOptions & RefetchQueryFilters<TPageData>) => Promise<QueryObserverResult<unknown, unknown>>;
}

interface Props{
  className?: string;
  getData: GetData;
}

export function UsersTable({ className, getData, }: Props) {

  // ** Global States
  const dispatch = useDispatch();
  const { users, } = useSelector((state:RootState) => 
    state.user);
  
  // ** Local States
  const [ selected, setSelected, ] = useState<string | null>(null);
  
  const { isError, isLoading, error, refetch, } = getData;

  useEffect(
    () => {
      refetch();
    }, [ refetch, ]
  );
  
  const usersF = users.map(user => 
    ({ id: user.id, email: user.email, role: user.role, zalogowany: user.currentTokenId, }));
  
  const {
    data:userID,
  } = useQuery(
    [ 'user', selected, ], async () => {
      const res = await fetch(
        `${apiUrl}/user/${selected}`, {
          credentials: 'include',
        }
      );
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    }
  );
  
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
  const data = useMemo(
    () =>
      (usersF), [ usersF, ]
  );
    
  const isEven = (i:number) =>
    i % 2 === 0;
  
  return (<>
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
        { data.map((
          row, i
        ) => 
          (
            <>
              <tr key={row.email} className={isEven(i + 1) ? `${styles.rowEven}` : ''}>

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
                  {row.zalogowany ? 'Tak' : ''}
                </td>
                <td className={`${styles.tData} ${styles.row}`}>
                  <span />
                  <Button
                    text={selected ===row.id?'✕ Mniej':'✓ Więcej'}
                    handleClick={() => 
                        selected === row.id ? setSelected(null) : setSelected(row.id)
                    }/>
                </td>
                <td className={`${styles.tData} ${styles.row}`}>
                  <Button
                    handleClick={() => {
                      dispatch(setUserId( row.id));
                      dispatch(openForm());
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
              {selected === row.id && userID? <UserTableRow
                widthRow={columns.length}
                userID={userID }
              /> : null}
            </>))}
      </tbody>
    </table>
  </>
  );
};
