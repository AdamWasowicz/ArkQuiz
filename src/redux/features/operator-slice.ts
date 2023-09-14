import { OperatorComparisonResult, OperatorRaceDescription } from '@/src/resources/operator/lib/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IOperatorState {
    currentGuesses: OperatorComparisonResult[],
    gameWon: boolean,
    raceDescriptionArray: OperatorRaceDescription[]
}

const initialState: IOperatorState = {
    currentGuesses: [],
    gameWon: false,
    raceDescriptionArray: []
}

const OperatorSlice = createSlice({
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
        },

        addRaceToArray(state: IOperatorState, action: PayloadAction<OperatorRaceDescription[]>) {
            action.payload.forEach((item) => {
                const isPresent = state.raceDescriptionArray.findIndex((obj) => {return item.Race === obj.Race}) !== -1 ? true : false;
                if (isPresent === false) {
                    state.raceDescriptionArray = [...state.raceDescriptionArray, item]
                }
            })
        }
    }
})

export const {
    addGuess, setGameWon, setGuesses,
    addRaceToArray
} = OperatorSlice.actions;

export default OperatorSlice.reducer;