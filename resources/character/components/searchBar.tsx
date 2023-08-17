"use client"
import { ChangeEvent } from "react";
import { CharacterHeaderMap, CharacterHeader } from "../lib/types";
import SearchBarResult from "./searchBarResult";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setSearchBarValue } from "@/redux/features/app-slice";
import { takeGuess } from "@/lib/data-fetching";

interface ISearchBar {
    characterHeaders: CharacterHeaderMap
}

const SearchBar: React.FC<ISearchBar> = (props) => {
    const searchValue = useAppSelector(state => state.app.searchBarValue);
    const dispatch = useAppDispatch();

    const handleInputContentChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchBarValue(event.target.value))
    }

    const handleFormSubmit = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        
        const selectedCharacterHeader = charactersHeaders.find(item => item.Name.toUpperCase() === searchValue.toUpperCase())
        if (typeof selectedCharacterHeader !== 'undefined') {
            const res = await takeGuess(localUrl, selectedCharacterHeader.Id)
            console.log(res);
        }
    }

    const filterCharactersHeaders = (): CharacterHeader[] => {
        if (searchValue.length > 0){
            const values = props.characterHeaders.get(searchValue[0].toUpperCase())
            let filteredValues = values?.filter(item => {
                return item.Name.toUpperCase().startsWith(searchValue.toUpperCase());
            })

            if (typeof filteredValues === 'undefined') {
                filteredValues = [];
            }

            return filteredValues!;
        }
        else {
            return []
        }
    }

    const localUrl = typeof window != 'undefined' ? window.location.href : '';
    const charactersHeaders = filterCharactersHeaders();

    return (
        <div>
            <input 
                type='text'
                onChange={handleInputContentChange}
                value={searchValue}
            />

            <button onClick={handleFormSubmit}>Submit</button>

            {
                charactersHeaders.length > 0 &&
                <SearchBarResult charactersHeaders={charactersHeaders}/>
            }
        </div>
    )
}

export default SearchBar;