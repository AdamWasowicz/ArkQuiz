"use client"

import { OperatorHeaderMap } from "@/resources/character/lib/types";
import SearchBar from "../search-bar/searchBar";
import CharacterGuessResult from "@/resources/character/components/guessResult/guessResult";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import styles from './characterGuessPage.module.scss';
import MainPanel from "@/resources/character/components/mainPanel/mainPanel";
import { ChangeEvent, useState } from "react";
import { submitCharacterGuess } from "@/lib/api-access";
import { addGuess, setGameWon } from "@/redux/features/character-slice";

interface ICharacterGuessPageProps {
    characterHeaderMap: OperatorHeaderMap
}

const CharacterGuessPage: React.FC<ICharacterGuessPageProps> = (props) => {
    const { characterHeaderMap } = props;

    const guesses = useAppSelector(state => state.character.currentGuesses)
    const operatorGuessWon = useAppSelector(state => state.character.gameWon);
    const dispatch = useAppDispatch();
    
    const [textInputValue, setTextInputValue] = useState<string>('');

    const onFormSubmit = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        
        const selectedCharacterHeader = characterHeaderMap.get(textInputValue.toUpperCase()[0])?.find(item => item.Name.toUpperCase() === textInputValue.toUpperCase())//filterCharactersHeaders(characterHeaderMap).find(item => item.Name.toUpperCase() === textInputValue.toUpperCase())
        if (typeof selectedCharacterHeader !== 'undefined') {
            const res = await submitCharacterGuess(selectedCharacterHeader.Id)
            setTextInputValue('')
            dispatch(addGuess(res));
            
            if (res.isCorrect) {
                dispatch(setGameWon(res.isCorrect));
            }

            console.log(res)
        }
    }

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTextInputValue(event.target.value);
    }

    const onResultClick = (value: string) => {
        setTextInputValue(value);
    }

    return (
        <div className={styles.page}>
            <MainPanel className={styles.mainPanel}/>

            <div className={styles.search}>
                <SearchBar
                    characterHeadersMap={characterHeaderMap}
                    currentGuessedOperatorNames={guesses.map(item => {
                        return (item.operator.Name)
                    })}
                    guessWon={operatorGuessWon}
                    inputTextValue={textInputValue}
                    onFormSubmit={onFormSubmit}
                    onInputChange={onInputChange}
                    onResultClick={onResultClick}
                />
            </div>

            <div className={styles.results}>
            {
                guesses.length > 0 &&
                <CharacterGuessResult guesses={guesses}/>
            }
            </div>
        </div>
    )
}

export default CharacterGuessPage;