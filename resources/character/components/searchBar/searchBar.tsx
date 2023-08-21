"use client"
import { ChangeEvent } from "react";
import { CharacterHeaderMap, CharacterHeader } from "../../lib/types";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setSearchBarValue } from "@/redux/features/app-slice";
import { addGuess, setGameWon } from '@/redux/features/character-slice';
import { takeGuess } from "@/lib/api-access";
import SearchBarResult from "./searchBarResult";
import styles from './searchBar.module.scss';
import { store } from "@/redux/store";

interface ISearchBar {
    characterHeaders: CharacterHeaderMap
}

const SearchBar: React.FC<ISearchBar> = (props) => {
    const searchValue = useAppSelector(state => state.app.searchBarValue);
    const guesses = useAppSelector(state => state.character.currentGuesses)
    const guessWon = useAppSelector(state => state.character.gameWon)
    const dispatch = useAppDispatch();

    const handleInputContentChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchBarValue(event.target.value))
    }

    const handleFormSubmit = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        
        const selectedCharacterHeader = charactersHeaders.find(item => item.Name.toUpperCase() === searchValue.toUpperCase())
        if (typeof selectedCharacterHeader !== 'undefined') {
            const res = await takeGuess(localUrl, selectedCharacterHeader.Id)
            dispatch(setSearchBarValue(''));
            dispatch(addGuess(res));
            
            if (res.isCorrect) {
                dispatch(setGameWon(res.isCorrect));
            }
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

            const guessedCharactersNames = guesses.map(item => { return item.character.Name });
            filteredValues = filteredValues.filter((item) => {
                return guessedCharactersNames.includes(item.Name)
                    ? false
                    : true;
            })

            return filteredValues!;
        }
        else {
            return []
        }
    }

    const onClickHandler = (value: string) => {
        dispatch(setSearchBarValue(value))
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

            <button 
                onClick={handleFormSubmit}
                disabled={guessWon}
            >
                Submit
            </button>

            <div className={styles.searchResult}>
                {
                    charactersHeaders.length > 0 &&
                    charactersHeaders.map((item, key) => {
                        return <SearchBarResult 
                            key={key} 
                            characterHeader={item}
                            onClick={onClickHandler}
                        />
                    })
                }
            </div>
        </div>
    )
}

export default SearchBar;