import { TalentComparisonResult } from '@/src/modules/talent/lib/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ITalentState {
    isWorking: boolean,

    currentGuesses: TalentComparisonResult[],

    errorMsg: string,

    gameWon: boolean,
}

const initialState: ITalentState = {
    isWorking: false,
    currentGuesses: [],
    errorMsg: "",
    gameWon: false
}

const TalentSlice = createSlice({
    name: 'talent',
    initialState,
    reducers: {
        setIsWorking(state: ITalentState, action: PayloadAction<boolean>) {
            state.isWorking = action.payload;
        },

        addGuess(state: ITalentState, action: PayloadAction<TalentComparisonResult>) {
            state.currentGuesses = [action.payload, ...state.currentGuesses];
        },

        setGuesses(state: ITalentState, action: PayloadAction<TalentComparisonResult[]>) {
            state.currentGuesses = action.payload;
        },

        setErrorMsg(state: ITalentState, action: PayloadAction<string>) {
            state.errorMsg = action.payload
        },

        setGameWon(state: ITalentState, action: PayloadAction<boolean>) {
            state.gameWon = action.payload;
        },
    }
})

export const {
    setIsWorking, setErrorMsg,
    addGuess, setGameWon, setGuesses,
} = TalentSlice.actions;

export default TalentSlice.reducer;