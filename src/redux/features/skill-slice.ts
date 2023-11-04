import { SkillComparisonResult } from '@/src/resources/skill/lib/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ISkillState {
    isWorking: boolean,

    currentGuesses: SkillComparisonResult[],
    gameWon: boolean,
}

const initialState: ISkillState = {
    isWorking: false,

    currentGuesses: [],
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

        setGameWon(state: ISkillState, action: PayloadAction<boolean>) {
            state.gameWon = action.payload;
        }
    }
})

export const {
    setIsWorking,
    addGuess, setGuesses, setGameWon
} = SkillSlice.actions;

export default SkillSlice.reducer;