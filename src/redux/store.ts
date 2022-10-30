import { configureStore, } from '@reduxjs/toolkit';
import loginReducer from './login/loginSlice';
import openReducer from './open/openSlice';
import userReducer from './user/userSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    open : openReducer,
    user : userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;