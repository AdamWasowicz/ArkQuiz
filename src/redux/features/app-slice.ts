import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IAppState {
    isLoading: boolean
}

const initialState: IAppState = {
    isLoading: false
}

const AppSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setIsLoading(state: IAppState, action: PayloadAction<boolean>) {
            state.isLoading = action.payload
        }
    }
})

export const {
    setIsLoading
} = AppSlice.actions;

export default AppSlice.reducer;