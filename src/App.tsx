/* eslint-disable no-constant-condition */
import React from 'react';
import { useSelector, } from 'react-redux';
import { Routes, Route, } from 'react-router-dom';
import type { RootState, } from './store';
import { CounterView, } from './views/CounterView';
import { LoginView, } from './views/LoginView';

export function App() {
  const id = useSelector((state:RootState) => 
    state.login.user.id );
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={!id ? <LoginView />:<CounterView/> } />
        <Route path='*' element={<LoginView />} />
      </Routes>
    </div>
  );
}