/* eslint-disable arrow-parens */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-key */

/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useMemo, useState, } from 'react';
import { useTable, Column, CellProps, } from 'react-table';
import { GetAllUsersRes, UserEntity, } from 'types';
import { apiUrl, } from '../config/api';

import styles from './UsersTable.module.css';

export function UsersTable() {
  const [ users, setUsers, ] = useState<GetAllUsersRes|[]>([]);
  
  const getAllUsers = async () => {
    const res = await fetch(
      `${apiUrl}/user`, {
        credentials: 'include',
      }
    );
    setUsers( await res.json());
  };

  useEffect(
    () => {
      getAllUsers();
    }, []
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
          Cell    : (row: any):any => { 
            if (row.value) {
              return 'tak';
            }return '';
          }, },
        { Header: 'Active', accessor: 'isActive', },
        { Header: 'CreatedBy', accessor: 'createdBy', },
        { Header: 'CreatedAt', accessor: 'createdAt', },
        { Header: 'UpdateAt', accessor: 'updatedAt', },
        { Header: () => 
          null,
        id      : 'more',
        accessor: 'id',
        Cell    : (row: any) => 
          <button onClick={() => 
            console.log(row) }>Więcej</button>, }, ]), []
  );

  const { getTableProps, headerGroups, getTableBodyProps, rows, prepareRow, } = useTable({ data, columns, });

  const isEven = (i:number) => 
    i % 2 === 0;
  
  return (

    <table className={styles.userTable} {...getTableProps()} >
      <thead >
        {headerGroups.map(headerGroup => 
          (
            <tr {...headerGroup.getHeaderGroupProps()} >
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
          return <tr {...row.getRowProps()} className={isEven(i) ? `${styles.rowEven}` : ''}>
            {row.cells.map(cell => 
              (
                <td {...cell.getCellProps()} className={styles.tabelData}>{ cell.render('Cell')}</td>
              ))}
          </tr>;
        })}
      </tbody>
    </table>
  );
};
