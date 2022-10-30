import React from 'react';
import { useSelector, } from 'react-redux';
import { Routes, Route, Navigate, } from 'react-router-dom';
import type { RootState, } from './redux/store';
import { HomeView, LoginView, UserView, } from './views';

export function App() {
  const { id, role, } = useSelector((state:RootState) => 
    state.login.user );
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={id ? <HomeView/> :<Navigate to='/login' />} />
        <Route path='users' element={ id && role==='admin' ? <UserView/> : <Navigate to='/login' />} />
        <Route path='login' element={!id ? <LoginView /> : <Navigate to='/' />} />
        <Route path='*' element={!id ? <HomeView/>: <Navigate to='/login' /> }/>
      </Routes>
    </div>
  );
}