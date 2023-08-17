import { CharacterHeader } from '@/resources/data/characters/lib/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllCharacterHeaders } from '@/resources/data/characters/lib/utils';

export interface ICharacterState {
    charactersHeaders: CharacterHeader[]
}

const initialState: ICharacterState = {
    charactersHeaders: getAllCharacterHeaders()
}

const CharacterSlice = createSlice({
    name: 'character',
    initialState,
    reducers: {

    }
})

export const {

} = CharacterSlice.actions;

export default CharacterSlice.reducer;