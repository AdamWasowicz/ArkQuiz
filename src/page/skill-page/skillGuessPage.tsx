"use client"
import { OperatorHeaderMap } from "@/src/resources/operator/lib/types";
import { routeToSkillIcon, submitSkillGuess } from "@/src/lib/serverFunctions";
import Image from "next/image";
import { getDaySkill } from "@/src/resources/skill/lib/utils";
import styles from './skillGuessPage.module.scss';
import SearchBar from "@/src/components/search-bar/searchBar";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { ChangeEvent, useState } from "react";
import { addGuess, setGameWon } from "@/src/redux/features/skill-slice";
import GuessResult from "@/src/resources/skill/components/guess-result/guessResult";
import MainPanel from "@/src/resources/skill/components/main-panel/mainPanel";

interface ISkillGuessPage {
    operatorHeaderMap: OperatorHeaderMap
}

const SkillGuessPage: React.FC<ISkillGuessPage> = (props) => {
    const { operatorHeaderMap } = props;

    const guesses = useAppSelector(state => state.skill.currentGuesses);
    const guessWon = useAppSelector(state => state.skill.gameWon);
    const dispatch = useAppDispatch();

    const [textInputValue, setTextInputValue] = useState<string>('');

    const onFormSubmit = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        
        const selectedOperatorHeader = operatorHeaderMap.get(textInputValue.toUpperCase()[0])?.find(item => item.Name.toUpperCase() === textInputValue.toUpperCase())
        
        if (typeof selectedOperatorHeader !== 'undefined') {
            //utils.saveOperatorDateToStorage();
            const res = await submitSkillGuess(selectedOperatorHeader.Id)
            setTextInputValue('')

            //await utils.saveCurrentGuessesToStorage([res ,...guesses]);
            dispatch(addGuess(res));
            
            if (res.IsCorrect) {
                //await utils.saveStatusToStorage(res.isCorrect)
                dispatch(setGameWon(res.IsCorrect));
            }
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
            <MainPanel/>

            {
                guessWon == false &&
                <div className={styles.search}>
                    <SearchBar
                        operatorHeadersMap={operatorHeaderMap}
                        currentGuessedOperatorNames={guesses.map(item => {
                            return (item.OperatorHeader.Name)
                        })}
                        guessWon={guessWon}
                        inputTextValue={textInputValue}
                        onFormSubmit={onFormSubmit}
                        onInputChange={onInputChange}
                        onResultClick={onResultClick}
                    />
                </div>
            }

            <div className={styles.result}>
                {
                    guesses.length > 0 &&
                    <GuessResult guesses={guesses}/>
                }
            </div>
        </div>
    )
}

export default SkillGuessPage;