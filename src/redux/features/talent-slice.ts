import { TalentComparisonResult, TalentHints } from '@/src/modules/talent/lib/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ITalentState {
    /** Indicates that action is in progress */
    isWorking: boolean,

    /** Array of current guesses in form of array of {@link TalentComparisonResult} */
    currentGuesses: TalentComparisonResult[],

     /** Contains text content of error */
    errorMsg: string,

    /** Indicates that guiz has concluded */
    gameWon: boolean,

    hints: TalentHints | undefined
}

const initialState: ITalentState = {
    isWorking: false,
    currentGuesses: [],
    errorMsg: "",
    gameWon: false,
    hints: undefined
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

        setHints(state: ITalentState, action: PayloadAction<TalentHints>) {
            state.hints = action.payload;
        }
    }
})

export const {
    setIsWorking, setErrorMsg,
    addGuess, setGameWon, setGuesses,
    setHints
} = TalentSlice.actions;

export default TalentSlice.reducer;