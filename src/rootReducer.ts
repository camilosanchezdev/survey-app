import { AnyAction, combineReducers } from '@reduxjs/toolkit';
import notificationsReducer from '@/components/Notifications/notificationSlice';
import { authSlice } from '@/features/auth';
import mainReducer from './mainSlice';

const appReducer = combineReducers({
  main: mainReducer,
  auth: authSlice.reducer,
  notifications: notificationsReducer,
});

export const rootReducer = (state: any, action: AnyAction) => {
  return appReducer(state, action);
};
