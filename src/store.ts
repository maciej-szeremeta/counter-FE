import { configureStore, } from '@reduxjs/toolkit';
import loginReducer from './features/login/loginSlice';
import openReducer from './features/open/openSlice';
import userReducer from './features/user/userSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    open : openReducer,
    user : userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;