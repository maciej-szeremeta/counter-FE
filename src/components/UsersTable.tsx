/* eslint-disable react/jsx-key */

import React, { useEffect, useMemo, useState, } from 'react';
import { useTable, Column, } from 'react-table';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, } from 'react-query';
import Modal from 'react-modal';
import { GetAllUsersRes, UserEntity, } from 'types';
import { Button, } from './common';
import { ModalDelete, } from './Modal';

import styles from './UsersTable.module.css';
import { apiUrl, } from '../config/api';

Modal.setAppElement('#root');

interface GetData {
  isError: boolean;
  isLoading: boolean;
  error: Error | null;
  refetch: <TPageData>(options?: RefetchOptions & RefetchQueryFilters<TPageData>) => Promise<QueryObserverResult<unknown, unknown>>;
  users: GetAllUsersRes | [];
}
interface Props{
  className?: string;
  getData: GetData;
}

export function UsersTable({ className, getData, }: Props) {
  const { isError, isLoading, error, refetch, users, } = getData;

  const [ modalIsOpen, setIsOpen, ] = useState<boolean>(false);
  const [ deleteId, setDeleteId, ] = useState<string>('');

  useEffect(
    () => {
      refetch();
    }, [ refetch, ]
  );

  const handleDeleteUser = async (id: string) => {
    await fetch(
      `${apiUrl}/user/${id}`, {
        method     : 'DELETE',
        credentials: 'include',
      }
    );
    refetch();
  };

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
              setDeleteId(value);
              setIsOpen(true);
            }}
            text='Usuń'
            type='button' />
          );
        }, }, ]), [ ]
  );

  const { getTableProps, headerGroups, getTableBodyProps, rows, prepareRow, } = useTable({ data, columns, });

  const isEven = (i:number) =>
    i % 2 === 0;
  
  return (<>
    {isLoading && (<p>Loading...</p>)}
    {isError && (<p>`Brak połączenia z bazą: {error?.message}`</p>)}
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
    <ModalDelete visible={modalIsOpen} setVisible={setIsOpen} deleteId={deleteId} handleClick={handleDeleteUser } />
  </>
  );
};
