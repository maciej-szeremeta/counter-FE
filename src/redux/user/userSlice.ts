/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-param-reassign */
import { createSlice, } from '@reduxjs/toolkit';
import { GetAllUsersRes, } from 'types';

export interface userState {
  users: GetAllUsersRes | [];
  userId: string;
  userErrorValid: string[];
  userUserErrorIsExist: string[];
}

const initialState: userState = {
  users               : [],
  userId              : '',
  userErrorValid      : [],
  userUserErrorIsExist: [],
};

interface GetUsers{
   payload: GetAllUsersRes
}

interface SetUserId{
  payload:string
}

interface SetUserErrorValid{
  payload:string[]
}

interface SetUserErrorIsExist{
  payload:string[]
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
    setUserErrorValid(
      state, action: SetUserErrorValid
    ) {
      state.userErrorValid=action.payload;
    },
    setUserErrorIsExist(
      state, action: SetUserErrorIsExist
    ) {
      state.userUserErrorIsExist=action.payload;
    },
  },
});

export const { getUsers, setUserId, setUserErrorValid, setUserErrorIsExist, } = userSlice.actions;

export default userSlice.reducer;