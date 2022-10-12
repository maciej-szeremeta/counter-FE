/* eslint-disable react/jsx-key */

import React, { useEffect, useMemo, } from 'react';
import { useTable, Column, } from 'react-table';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, } from 'react-query';
import Modal from 'react-modal';
import { useDispatch, useSelector, } from 'react-redux';
import { GetAllUsersRes, UserEntity, } from 'types';
import { openForm, openModal, } from '../features/open/openSlice';
import { setUserId, } from '../features/user/userSlice';
import { RootState, } from '../store';

import { Button, } from './common';
import styles from './UsersTable.module.css';

Modal.setAppElement('#root');

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

  const { users, } = useSelector((state:RootState) => 
    state.user);
  
  const { isError, isLoading, error, refetch, } = getData;

  const dispatch = useDispatch();

  useEffect(
    () => {
      refetch();
    }, [ refetch, ]
  );

  const data = useMemo(
    ():GetAllUsersRes|[] =>
      (users), [ users, ]
  );

  const columns= useMemo(
    ():Column<UserEntity>[] =>
      ([ { Header: 'Id', accessor: 'id', },
        { Header: 'Email', accessor: 'email', },
        { Header: 'Role', accessor: 'role', },
        { Header  : 'Zalogowany',
          id      : 'currentTokenId',
          accessor: 'currentTokenId',
          Cell    : row => { 
            const { value, } = row;
            if (value) {
              return <span>tak</span>;
            }return <span />;
          }, },
        { Header: 'Active', accessor: 'isActive', },
        { Header: 'CreatedBy', accessor: 'createdBy', },
        { Header: 'CreatedAt', accessor: 'createdAt', },
        { Header: 'UpdateAt', accessor: 'updatedAt', },
        { Header: () =>
          null,
        id      : 'more',
        accessor: 'id',
        Cell    : row => {
          const { value, } = row;
          return <Button href={`${value}`} text='Więcej'/>;
        }, },
        { Header: () =>
          null,
        id      : 'delete',
        accessor: 'id',
        Cell    : row => {
          const { value, } = row;
          return (<Button
            handleClick={() => {
              dispatch(setUserId(value));
              dispatch(openModal());
            }}
            text='Usuń'
            type='button' />
          );
        }, },
        { Header: () =>
          null,
        id      : 'edit',
        accessor: 'id',
        Cell    : row => {
          const { value, } = row;
          return (<Button
            handleClick={() => {
              dispatch(setUserId(value));
              dispatch(openForm());
            }}
            text='Edytuj'
            type='button' />
          );
        }, }, ]), [ dispatch, ]
  );

  const { getTableProps, headerGroups, getTableBodyProps, rows, prepareRow, } = useTable({ data, columns, });

  const isEven = (i:number) =>
    i % 2 === 0;
  
  return (<>
    {isLoading && (<p>Loading...</p>)}
    {isError && (<p>Brak połączenia z bazą: {error?.message}</p>)}
    <table className={styles.userTable} {...getTableProps()} cellSpacing='0'>
      <thead >
        {headerGroups.map(headerGroup =>
          (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column =>
                (<th {...column.getHeaderProps()} className={styles.tabelHeader}>{column.render('Header')}</th>))}
            </tr>
          ))}
      </thead>

      <tbody {...getTableBodyProps()} >
        {rows.map((
          row, i
        ) => { 
          prepareRow(row);
          return <tr {...row.getRowProps()} className={isEven(i) ? `${styles.rowEven}` : ''} >
            {row.cells.map(cell =>
              (
                <td {...cell.getCellProps()} className={styles.tabelData} >{cell.render('Cell')}</td>
              ))}
          </tr>;
        })}
      </tbody>
    </table>
  </>
  );
};
