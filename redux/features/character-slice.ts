import { OperatorComparisonResult } from '@/resources/character/lib/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ICharacterState {
    currentGuesses: OperatorComparisonResult[],
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
        addGuess(state: ICharacterState, action: PayloadAction<OperatorComparisonResult>) {
            state.currentGuesses = [action.payload, ...state.currentGuesses];
        },

        setGuesses(state: ICharacterState, action: PayloadAction<OperatorComparisonResult[]>) {
            state.currentGuesses = action.payload;
        },

        setGameWon(state: ICharacterState, action: PayloadAction<boolean>) {
            state.gameWon = action.payload;
        }
    }
})

export const {
    addGuess, setGameWon, setGuesses
} = CharacterSlice.actions;

export default CharacterSlice.reducer;