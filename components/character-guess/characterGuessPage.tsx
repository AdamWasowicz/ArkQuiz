"use client"

import { CharacterHeaderMap } from "@/resources/character/lib/types";
import SearchBar from "@/resources/character/components/searchBar/searchBar";
import CharacterGuessResult from "@/resources/character/components/guessResult/guessResult";
import { useAppSelector } from "@/redux/hooks";
import styles from './characterGuessPage.module.scss';

interface ICharacterGuessPageProps {
    headers: CharacterHeaderMap
}

const CharacterGuessPage: React.FC<ICharacterGuessPageProps> = (props) => {
    const { headers } = props;
    const guesses = useAppSelector(state => state.character.currentGuesses)

    return (
        <div className={styles.page}>
            <div className={styles.search}>
                <SearchBar characterHeaders={headers}/>
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