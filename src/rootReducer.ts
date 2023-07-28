import { AnyAction, combineReducers } from '@reduxjs/toolkit';
import mainReducer from './main.slice';

const appReducer = combineReducers({
  main: mainReducer,
});

export const rootReducer = (state: any, action: AnyAction) => {
  return appReducer(state, action);
};
