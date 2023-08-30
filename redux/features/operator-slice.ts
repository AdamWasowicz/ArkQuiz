import { OperatorComparisonResult } from '@/resources/operator/lib/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IOperatorState {
    currentGuesses: OperatorComparisonResult[],
    gameWon: boolean
}

const initialState: IOperatorState = {
    currentGuesses: [],
    gameWon: false
}

const OperatorSlice  = createSlice({
    name: 'operator',
    initialState,
    reducers: {
        addGuess(state: IOperatorState, action: PayloadAction<OperatorComparisonResult>) {
            state.currentGuesses = [action.payload, ...state.currentGuesses];
        },

        setGuesses(state: IOperatorState, action: PayloadAction<OperatorComparisonResult[]>) {
            state.currentGuesses = action.payload;
        },

        setGameWon(state: IOperatorState, action: PayloadAction<boolean>) {
            state.gameWon = action.payload;
        }
    }
})

export const {
    addGuess, setGameWon, setGuesses
} = OperatorSlice.actions;

export default OperatorSlice.reducer;