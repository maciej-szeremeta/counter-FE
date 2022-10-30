/* eslint-disable no-param-reassign */

import { createSlice, } from '@reduxjs/toolkit';

export interface openState {
   openForm: boolean;
   openModal: boolean;
}

const initialState: openState = {
  openForm : false,
  openModal: false,
};

export const openSlice = createSlice({
  name    : 'open',
  initialState,
  reducers: {
    openForm: state => {
      state.openForm = !(state.openForm);
    },
    openModal: state => {
      state.openModal = !(state.openModal);
    },
  },
});

export const { openForm, openModal, } = openSlice.actions;

export default openSlice.reducer;