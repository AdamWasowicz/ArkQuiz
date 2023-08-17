import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IAppState {
    searchBarValue: string
}

const initialState: IAppState = {
    searchBarValue: ''
}

const AppSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setSearchBarValue(state: IAppState, action: PayloadAction<string>) {
            state.searchBarValue = action.payload;
        }
    }
})

export const {
    setSearchBarValue
} = AppSlice.actions;

export default AppSlice.reducer;