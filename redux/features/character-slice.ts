import { CharacterComparisonResult } from '@/resources/character/lib/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ICharacterState {
    currentGuesses: CharacterComparisonResult[],
    gameWon: boolean
}

const initialState: ICharacterState = {
    currentGuesses: [],
    gameWon: false
}

const CharacterSlice  = createSlice({
    name: 'character',
    initialState,
    reducers: {
        addGuess(state: ICharacterState, action: PayloadAction<CharacterComparisonResult>) {
            state.currentGuesses = [action.payload, ...state.currentGuesses]
        },

        setGameWon(state: ICharacterState, action: PayloadAction<boolean>) {
            state.gameWon = action.payload;
        }
    }
})

export const {
    addGuess, setGameWon
} = CharacterSlice.actions;

export default CharacterSlice.reducer;