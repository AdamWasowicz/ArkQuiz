import { CharacterComparisonResult } from '@/resources/character/lib/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IAppState {
    searchBarValue: string,
    currentGuesses: CharacterComparisonResult[],
    characterGuessWon: boolean
}

const initialState: IAppState = {
    searchBarValue: '',
    currentGuesses: [],
    characterGuessWon: false
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