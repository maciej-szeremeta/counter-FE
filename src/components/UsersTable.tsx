/* eslint-disable react/jsx-key */

import React, { useEffect, useMemo, useState, } from 'react';
import { useTable, Column, } from 'react-table';
import { useQuery, } from 'react-query';
import { GetAllUsersRes, UserEntity, } from 'types';
import { apiUrl, } from '../config/api';

import styles from './UsersTable.module.css';

export function UsersTable() {

  const [ users, setUsers, ] = useState<GetAllUsersRes|[]>([]);
  
  const { isLoading, isError, error, refetch, } = useQuery<GetAllUsersRes, Error>(
    'user', async ():Promise<GetAllUsersRes> => {
      const res = await fetch(
        `${apiUrl}/user`, {
          credentials: 'include',
        }
      );
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();

      setUsers( data);
      return data;
    }
  );

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
        Cell    : row =>
          <button type='button' onClick={() =>
            console.log(row) }>Więcej</button>, }, ]), []
  );

  const { getTableProps, headerGroups, getTableBodyProps, rows, prepareRow, } = useTable({ data, columns, });

  const isEven = (i:number) =>
    i % 2 === 0;
  
  return (<>
    {isLoading && (<p>Loading...</p>)}
    {isError && (<p>`Brak połączenia z bazą: {error.message}`</p>)}
    <table className={styles.userTable} {...getTableProps()} >
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
                <td {...cell.getCellProps()} className={styles.tabelData}>{cell.render('Cell')}</td>
              ))}
          </tr>;
        })}
      </tbody>
    </table>
  </>
  );
};
