/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-param-reassign */
import { createSlice, } from '@reduxjs/toolkit';
import { GetAllUsersRes, } from 'types';
import { apiUrl, } from '../../config/api';

export interface userState {
  users: GetAllUsersRes | [];
  userId:string
}

const initialState: userState = {
  users : [],
  userId: '',
};

interface GetUsers{
   payload: GetAllUsersRes
}

interface SetUserId{
  payload:string
}

export const userSlice = createSlice({
  name    : 'user',
  initialState,
  reducers: {

    getUsers: (
      state, action:GetUsers
    ) => {
      state.users = action.payload; 
    },
    setUserId(
      state, action: SetUserId
    ) {
      state.userId=action.payload;
    },
  },
});

export const { getUsers, setUserId, } = userSlice.actions;

export default userSlice.reducer;