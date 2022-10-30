/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { DeletedUserRes, GetAllUsersRes, GetOneUserRes, } from 'types';
import { apiUrl, } from '../config/api';

interface AddUserData{
  email: string;
  pwd:string
}

export const getUsers = async (): Promise<GetAllUsersRes> => {
  const res = await fetch(
    `${apiUrl}/user`, {
      credentials: 'include',
    }
  );
  const data = await res.json();
  if(!res.ok) throw data;
  return data;
};

export const getOneUser = async (id:string):Promise<GetOneUserRes> => {
  const res = await fetch(
    `${apiUrl}/user/${id}`, {
      credentials: 'include',
    }
  );
  const data = await res.json();
  if(!res.ok) throw data;
  return data;

};

export const deleteUser = async (id:string):Promise<DeletedUserRes> => {

  const res = await fetch(
    `${apiUrl}/user/${id}`, {
      method     : 'DELETE',
      credentials: 'include',
    }
  );
  const data = await res.json();
  if(!res.ok) throw data;
  return data;
};

export const registerUser = async (formData: AddUserData) => {
  const res = await fetch(
    `${apiUrl}/user/register-user`, {
      method     : 'POST',
      headers    : { 'Content-Type': 'application/json', },
      credentials: 'include',
      body       : JSON.stringify(formData),
    }
  );
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
};
