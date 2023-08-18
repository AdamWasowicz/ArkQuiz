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
        },

        addGuess(state: IAppState, action: PayloadAction<CharacterComparisonResult>) {
            state.currentGuesses = [action.payload, ...state.currentGuesses]
        },

        setCharacterGuessWon(state: IAppState, action: PayloadAction<boolean>) {
            state.characterGuessWon = action.payload;
        }
    }
})

export const {
    setSearchBarValue, addGuess, setCharacterGuessWon
} = AppSlice.actions;

export default AppSlice.reducer;