"use client"
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import styles from './talentQuizPage.module.scss';
import { OperatorHeaderMap } from "@/src/modules/operator/lib/types"
import { ChangeEvent, useEffect, useState } from "react";
import useLocalStorage from './talentQuiz.utils';
import { setErrorMsg, setIsWorking, addGuess, setGameWon, setGuesses } from '@/src/redux/features/talent-slice';
import { submitTalentGuess } from "@/src/lib/client-to-server-functions";
import QuizSearchBar from '@/src/components/quiz/quiz-search-bar/searchBar';
import GuessResult from '@/src/modules/skill/components/guess-result/guessResult';
import TalentQuizMainPanel from '@/src/modules/talent/components/main-panel/mainPanel';
import PageLayout from '@/src/layouts/page-layout/pageLayout';
import useRecapLocalStorage from '../recap-page/recapPage.utils';
import NextQuizButton from '@/src/components/quiz/next-quiz-button/nextQuizButton';
import { useRouter } from 'next/navigation';

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
    const recapHook = useRecapLocalStorage();
    const router = useRouter();


    const sendGuess = async (value: string) => {
        if (isWorking === true) { 
            return; 
        }
        else { 
            dispatch(setErrorMsg(""));
            dispatch(setIsWorking(true)); 
        }
        
        const excludedOperatorNames = guesses.map(item => item.OperatorHeader.Name);
        const selectedOperatorHeader = operatorHeaderMap
            .get(value.toUpperCase()[0])
                ?.find(item => {
                    const iU = item.Name.toUpperCase();
                    return iU.includes(value.toUpperCase()) && excludedOperatorNames.findIndex(item => item.toUpperCase() === iU) === -1 
                })
        
        if (typeof selectedOperatorHeader !== 'undefined') {
            localstorageHook.saveDateToStorage();
            const res = await submitTalentGuess(selectedOperatorHeader.Id)

            if (res === undefined) {
                dispatch(setErrorMsg(`Error occured while submiting guess for Operator with Id: ${selectedOperatorHeader.Id}`))
                dispatch(setIsWorking(false));
                return;
            }

            const newState = [res ,...guesses];
            setTextInputValue('')
            localstorageHook.saveCurrentGuessesToStorage(newState);
            dispatch(setIsWorking(false));
            dispatch(addGuess(res));
            
            // Quiz is won
            if (res.IsCorrect) {
                localstorageHook.saveStatusToStorage(res.IsCorrect)
                recapHook.updateTalent(newState);
                dispatch(setGameWon(res.IsCorrect));
            }
        }
        else {
            dispatch(setErrorMsg(`Selected OperatorHeader not found, value was: ${value}`));
            dispatch(setIsWorking(false)); 
        }
    }

    const onFormSubmit = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        sendGuess(textInputValue); 
    }

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTextInputValue(event.target.value);
    }

    const onResultClick = (value: string) => {
        sendGuess(value);
    }

    const toNextQuiz = () => {
        router.push('/recap');
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

    // Scroll to element
    useEffect(() => {
        if (quizWon === true) {
            const element = document.getElementById('mainContent');
            if (element !== null) {
                element.scrollIntoView({
                    behavior: "smooth"
                })
            }
        }
    }, [quizWon])


    return (
        <PageLayout>
            <TalentQuizMainPanel/>

            {
                quizWon == false &&
                <div className={styles.search}>
                    <QuizSearchBar
                        operatorHeadersMap={operatorHeaderMap}
                        excludedOperatorNames={guesses.map(item => {
                            return (item.OperatorHeader.Name)
                        })}
                        isFormDisabled={quizWon}
                        inputTextValue={textInputValue}
                        onFormSubmit={onFormSubmit}
                        onInputChange={onInputChange}
                        onResultClick={onResultClick}
                        onEnterKeyDown={() => onResultClick(textInputValue)}
                    />
                </div>
            }

            {
                quizWon &&
                <NextQuizButton onClick={toNextQuiz} id={'nextQuizButton'} textContent="Go to recap"/>
            }

            <div className={styles.result}>
                {
                    guesses.length > 0 &&
                    <GuessResult guesses={guesses}/>
                }
            </div>
        </PageLayout>
    )
}

export default TalentQuizPage;