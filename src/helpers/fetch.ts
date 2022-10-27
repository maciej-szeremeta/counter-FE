/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { DeletedUserRes, GetAllUsersRes, GetOneUserRes, } from 'types';
import { apiUrl, } from '../config/api';

export const getUsers = async ():Promise<GetAllUsersRes> => {
  try {
    const res = await fetch(
      `${apiUrl}/user`, {
        credentials: 'include',
      }
    );
    const data = await res.json();
    return data;
  }
  catch (err) {
    throw new Error('Network response was not ok');
  }
};

export const getOneUser = async (id:string):Promise<GetOneUserRes> => {
  try {
    const res = await fetch(
      `${apiUrl}/user/${id}`, {
        credentials: 'include',
      }
    );
    const data = await res.json();
    return data;
  }
  catch (err) {
    throw new Error('Network response was not ok');
  }
};

export const deleteUser = async (id:string):Promise<DeletedUserRes> => {
  try {
    const res = await fetch(
      `${apiUrl}/user/${id}`, {
        method     : 'DELETE',
        credentials: 'include',
      }
    );
    const data = await res.json();
    return data;
  }
  catch (err) {
    throw new Error('Network response was not ok');
  }
};