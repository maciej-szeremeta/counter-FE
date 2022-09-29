/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useMemo, useState, } from 'react';
import { useTable, Column, } from 'react-table';
import { GetAllUsersRes, UserEntity, } from 'types';
import { apiUrl, } from '../config/api';

import styles from './UsersTable.module.css';

// type Person = {
//   id: number;
//   firstName: string;
//   lastName: string;
//   age: number;
//   visits: number;
//   status: string;
//   progress: number;
// }

// const userss: Person[] = [
//   {
//     id       : 1,
//     firstName: 'tanner',
//     lastName : 'linsley',
//     age      : 24,
//     visits   : 100,
//     status   : 'In Relationship',
//     progress : 50,
//   },
//   {
//     id       : 2,
//     firstName: 'tandy',
//     lastName : 'miller',
//     age      : 40,
//     visits   : 40,
//     status   : 'Single',
//     progress : 80,
//   },
//   {
//     id       : 3,
//     firstName: 'joe',
//     lastName : 'dirte',
//     age      : 45,
//     visits   : 20,
//     status   : 'Complicated',
//     progress : 10,
//   },
// ];

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
        { Header: 'Token', accessor: 'currentTokenId', },
        { Header: 'Active', accessor: 'isActive', },
        { Header: 'CreatedBy', accessor: 'createdBy', },
        { Header: 'CreatedAt', accessor: 'createdAt', },
        { Header: 'UpdateAt', accessor: 'updatedAt', }, ]), [ ]
  );

  const { getTableProps, headerGroups, getTableBodyProps, rows, prepareRow, } = useTable({ data, columns, });

  return (

    <table className={styles.userTable} {...getTableProps()} >
      <thead >
        {headerGroups.map(headerGroup => 
          (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(col => 
                (<th {...col.getHeaderProps()}>{col.render('Header')}</th>))}
            </tr>
          ))}
      </thead>

      <tbody {...getTableBodyProps()} >
        {rows.map(row => { 
          prepareRow(row);
          return <tr {...row.getRowProps()} >
            {row.cells.map((
              cell, i
            ) => 
              (
                <td {...cell.getCellProps()}>{ cell.render('Cell')}</td>
              ))}
          </tr>;
        })}
      </tbody>
    </table>
  );
};
