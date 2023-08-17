import { configureStore } from '@reduxjs/toolkit';
import characterReducer from './features/character-slice';
import appReducer from './features/app-slice';

export const store = configureStore({
    reducer: {
      //character: characterReducer,
      //app: appReducer   
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;