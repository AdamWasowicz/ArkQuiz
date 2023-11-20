import { SkillComparisonResult } from '@/src/modules/skill/lib/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ISkillState {
    /** Indicates that action is in progress */
    isWorking: boolean,

     /** Array of current guesses in form of array of {@link SkillComparisonResult} */
    currentGuesses: SkillComparisonResult[],

    /** Contains text content of error */
    errorMsg: string,

    /** Indicates that guiz has concluded */
    gameWon: boolean,
}

const initialState: ISkillState = {
    isWorking: false,
    currentGuesses: [],
    errorMsg: "",
    gameWon: false
}

const SkillSlice = createSlice({
    name: 'skill',
    initialState,
    reducers: {
        setIsWorking(state: ISkillState, action: PayloadAction<boolean>) {
            state.isWorking = action.payload;
        },

        addGuess(state: ISkillState, action: PayloadAction<SkillComparisonResult>) {
            state.currentGuesses = [action.payload, ...state.currentGuesses];
        },

        setGuesses(state: ISkillState, action: PayloadAction<SkillComparisonResult[]>) {
            state.currentGuesses = action.payload;
        },

        setErrorMsg(state: ISkillState, action: PayloadAction<string>) {
            state.errorMsg = action.payload
        },

        setGameWon(state: ISkillState, action: PayloadAction<boolean>) {
            state.gameWon = action.payload;
        }
    }
})

export const {
    setIsWorking, setErrorMsg,
    addGuess, setGuesses, setGameWon
} = SkillSlice.actions;

export default SkillSlice.reducer;