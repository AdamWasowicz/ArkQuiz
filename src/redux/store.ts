import { configureStore } from '@reduxjs/toolkit';
import appReducer from './features/app-slice';
import operatorReducer from './features/operator-slice';
import skillReducer from '@/src/redux/features/skill-slice';
import talentReducer from '@/src/redux/features/talent-slice';

export const store = configureStore({
    reducer: {
      /** Reducer for Operator quiz */
      operator: operatorReducer,
      
      /** Reducer for Skill quiz */
      skill: skillReducer,

      /** Reducer for Talent quiz */
      talent: talentReducer,

      /** Reducer for App */
      app: appReducer   
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;