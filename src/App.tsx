import React from 'react';
import { useSelector, } from 'react-redux';
import { Routes, Route, Navigate, } from 'react-router-dom';
import type { RootState, } from './store';
import { DashboardView, } from './views/DashboardView';
import { LoginView, } from './views/LoginView';

export function App() {
  const id = useSelector((state:RootState) => 
    state.login.user.id );
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={!id ? <Navigate to='login' />:<DashboardView/> } />
        <Route path='/login' element={!id ? <LoginView /> : <Navigate to='/' />} />
        <Route path='*' element={<LoginView />} />
      </Routes>
    </div>
  );
}