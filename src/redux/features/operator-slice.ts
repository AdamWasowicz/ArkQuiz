import { OperatorComparisonResultV2, OperatorRaceDescription } from '@/src/resources/operator/lib/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IOperatorState {
    isWorking: boolean,

    currentGuesses: OperatorComparisonResultV2[],
    gameWon: boolean,
    raceDescriptionArray: OperatorRaceDescription[]
}

const initialState: IOperatorState = {
    isWorking: false,

    currentGuesses: [],
    gameWon: false,
    raceDescriptionArray: []
}

const OperatorSlice = createSlice({
    name: 'operator',
    initialState,
    reducers: {
        setIsWorking(state: IOperatorState, action: PayloadAction<boolean>) {
            state.isWorking = action.payload;
        },

        addGuess(state: IOperatorState, action: PayloadAction<OperatorComparisonResultV2>) {
            state.currentGuesses = [action.payload, ...state.currentGuesses];
        },

        setGuesses(state: IOperatorState, action: PayloadAction<OperatorComparisonResultV2[]>) {
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
    setIsWorking,
    addGuess, setGameWon, setGuesses,
    addRaceToArray
} = OperatorSlice.actions;

export default OperatorSlice.reducer;