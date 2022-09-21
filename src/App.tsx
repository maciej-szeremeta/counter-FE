import React from 'react';
import { Routes, Route, } from 'react-router-dom';
import { LoginView, } from './views/LoginView';

export function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<LoginView />} />
      </Routes>
    </div>
  );
}