"use client"

import { CharacterHeaderMap } from "@/resources/character/lib/types";
import SearchBar from "@/resources/character/components/searchBar/searchBar";
import CharacterGuessResult from "@/resources/character/components/guessResult/guessResult";
import { useAppSelector } from "@/redux/hooks";
import { store } from '../../redux/store'

interface ICharacterGuessPageProps {
    headers: CharacterHeaderMap
}

const CharacterGuessPage: React.FC<ICharacterGuessPageProps> = (props) => {
    const { headers } = props;
    const guesses = useAppSelector(state => state.character.currentGuesses)
    console.log('CGP: ', guesses);

    return (
        <div>
            <SearchBar characterHeaders={headers}/>

            {
                guesses.length > 0 &&
                <CharacterGuessResult guesses={guesses}/>
            }
        </div>
    )
}

export default CharacterGuessPage;