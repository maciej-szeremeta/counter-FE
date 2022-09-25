/* eslint-disable no-param-reassign */
import { createSlice, } from '@reduxjs/toolkit';

export interface loginState {
   user: {
      id: string|null;
      email: string;
      role: string;
   }
}

const initialState: loginState = {
  user: {
    id   : null,
    email: '',
    role : '',
  },
};

interface LoginUser{
   payload: { id: string, email: string, role: string; }
}
export const loginSlice = createSlice({
  name    : 'login',
  initialState,
  reducers: {
    loginUser: (
      state, action:LoginUser
    ) => {
      state.user.id = action.payload.id;
      state.user.email = action.payload.email;
      state.user.role = action.payload.role;
    },
    logoutUser: state => {
      state.user.id = null;
      state.user.email = '';
      state.user.role = '';
    },
  },
});

export const { loginUser, logoutUser, } = loginSlice.actions;

export default loginSlice.reducer;