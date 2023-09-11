import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IAppState {
}

const initialState: IAppState = {
}

const AppSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        
    }
})

export const {

} = AppSlice.actions;

export default AppSlice.reducer;