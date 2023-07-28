import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SeverityType } from '@/types/severity.type';

interface attributes {
  severity: SeverityType;
  summary: string;
  detail: string;
  showNotification: boolean;
}

const initialState: attributes = {
  showNotification: false,
  severity: undefined,
  summary: '',
  detail: '',
};

export const notificationSlice = createSlice({
  name: 'notifications',
  initialState: initialState,

  reducers: {
    displayNotification: (
      state,
      action: PayloadAction<{ severity: SeverityType; summary: string; detail: string }>,
    ) => {
      state.showNotification = true;
      state.severity = action.payload.severity;
      state.summary = action.payload.summary;
      state.detail = action.payload.detail;
    },
    clearNotification: (state) => {
      state.showNotification = false;
      state.severity = undefined;
      state.summary = '';
      state.detail = '';
    },
  },
});
export const { displayNotification, clearNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
