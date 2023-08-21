import { configureStore } from '@reduxjs/toolkit';
import appReducer from './features/app-slice';
import characterReducer from './features/character-slice';

export const store = configureStore({
    reducer: {
      character: characterReducer,
      app: appReducer   
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;