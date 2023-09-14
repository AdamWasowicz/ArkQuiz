import { SkillComparisonResult } from '@/src/resources/skill/lib/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ISkillState {
    currentGuesses: SkillComparisonResult[],
    gameWon: boolean,
}

const initialState: ISkillState = {
    currentGuesses: [],
    gameWon: false
}

const SkillSlice = createSlice({
    name: 'skill',
    initialState,
    reducers: {
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
    addGuess, setGuesses, setGameWon
} = SkillSlice.actions;

export default SkillSlice.reducer;