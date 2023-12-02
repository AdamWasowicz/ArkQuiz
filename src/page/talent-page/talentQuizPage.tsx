"use client"
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import styles from './talentQuizPage.module.scss';
import { OperatorHeaderMap } from "@/src/modules/operator/lib/types"
import { ChangeEvent, useEffect, useState } from "react";
import useLocalStorage from './talentQuiz.utils';
import { setErrorMsg, setIsWorking, addGuess, setGameWon, setGuesses } from '@/src/redux/features/talent-slice';
import { submitTalentGuess } from "@/src/lib/serverFunctions";
import SearchBar from '@/src/components/search-bar/searchBar';
import GuessResult from '@/src/modules/skill/components/guess-result/guessResult';
import MainPanel from '@/src/modules/talent/components/main-panel/mainPanel';
import QuizMainBody from '@/src/components/quiz-main-body/quizMainBody';

interface ITalentPage {
    operatorHeaderMap: OperatorHeaderMap
}

const TalentQuizPage: React.FC<ITalentPage> = (props) => {
    const { operatorHeaderMap } = props;
    const guesses = useAppSelector(state => state.talent.currentGuesses);
    const isWorking = useAppSelector(state => state.talent.isWorking);
    const quizWon = useAppSelector(state => state.talent.gameWon);
    const dispatch = useAppDispatch();
    const localstorageHook = useLocalStorage();
    const [textInputValue, setTextInputValue] = useState<string>('');


    const onFormSubmit = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        // isWorking
        if (isWorking === true) { 
            return; 
        }
        else { 
            dispatch(setErrorMsg(""));
            dispatch(setIsWorking(true)); 
        }
        
        const selectedOperatorHeader = operatorHeaderMap
            .get(textInputValue.toUpperCase()[0])
                ?.find(item => item.Name.toUpperCase() === textInputValue.toUpperCase())
        
        if (typeof selectedOperatorHeader !== 'undefined') {
            localstorageHook.saveDateToStorage();
            const res = await submitTalentGuess(selectedOperatorHeader.Id)

            if (res === undefined) {
                dispatch(setErrorMsg(`Error occured while submiting guess for Operator with Id: ${selectedOperatorHeader.Id}`))
                dispatch(setIsWorking(false));
                return;
            }

            setTextInputValue('')
            localstorageHook.saveCurrentGuessesToStorage([res ,...guesses]);
            dispatch(setIsWorking(false));
            dispatch(addGuess(res));
            
            // Quiz is won
            if (res.IsCorrect) {
                localstorageHook.saveStatusToStorage(res.IsCorrect)
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

    // Load data from localstorage
    useEffect(() => {
        // Check if data is outdated
        // if so then delete current stored data
        if (localstorageHook.isDataOutdated()) {
            localstorageHook.removeCurrentGuessesFromStorage();
            localstorageHook.removeStatusFromStorage();
            localstorageHook.removeDateFromStorage();
            return;
        }

        // Guesses
        const data = localstorageHook.getCurrentGuessesFromStorage();
        dispatch(setGuesses(data));

        //Status
        const status = localstorageHook.getStatusFromStorage();
        dispatch(setGameWon(status))
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <QuizMainBody>
            <MainPanel/>

            {
                quizWon == false &&
                <div className={styles.search}>
                    <SearchBar
                        operatorHeadersMap={operatorHeaderMap}
                        currentGuessedOperatorNames={guesses.map(item => {
                            return (item.OperatorHeader.Name)
                        })}
                        isFormDisabled={quizWon}
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
        </QuizMainBody>
    )
}

export default TalentQuizPage;