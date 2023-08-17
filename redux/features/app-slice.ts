import { CharacterHeaderMap } from '@/resources/data/characters/lib/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllCharactersHeaderMap } from '@/resources/data/characters/lib/utils';

export interface IAppState {
    characterHeaderMap: CharacterHeaderMap
}

const initialState: IAppState = {
    characterHeaderMap: getAllCharactersHeaderMap()
}

const AppSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {

    }
})

export const {

} = AppSlice.actions;

export default AppSlice.reducer;