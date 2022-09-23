import React from 'react';
import { useSelector, } from 'react-redux';
import type { RootState, } from '../store';

export function CounterView() {
  const user = useSelector((state:RootState) => 
    state.login.user);
  return (
    <div>Witaj {user.email }</div>
  );
};