import { configureStore } from '@reduxjs/toolkit';
import appReducer from './features/app-slice';
import operatorReducer from './features/operator-slice';

export const store = configureStore({
    reducer: {
      operator: operatorReducer,
      app: appReducer   
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;