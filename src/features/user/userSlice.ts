/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-param-reassign */
import { createSlice, } from '@reduxjs/toolkit';
import { GetAllUsersRes, } from 'types';
import { apiUrl, } from '../../config/api';

export interface userState {
  users: GetAllUsersRes | [];
}

const initialState: userState = {
  users: [],
};

interface DeleteUser{
   payload: { id: string, }
}

export const userSlice = createSlice({
  name    : 'user',
  initialState,
  reducers: {

    deleteUser: (
      state, action:DeleteUser
    ) => {
      (async () => {
        await fetch(
          `${apiUrl}/user/${action.payload.id}`, {
            method     : 'DELETE',
            credentials: 'include',
          }
        );
      })();
    },
  },
});

export const { deleteUser, } = userSlice.actions;

export default userSlice.reducer;