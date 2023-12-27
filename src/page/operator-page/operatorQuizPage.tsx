"use client"
import { OperatorHeaderMap } from "@/src/modules/operator/lib/types";
import QuizSearchBar from "@/src/components/quiz/quiz-search-bar/searchBar";
import OperatorGuessResult from "@/src/modules/operator/components/guess-result/guessResult";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import styles from './operatorQuizPage.module.scss';
import OperatorQuizMainPanel from "@/src/modules/operator/components/main-panel/mainPanel";
import { ChangeEvent, useEffect, useState } from "react";
import { submitOperatorGuess } from "@/src/lib/client-to-server-functions";
import { addGuess, setErrorMsg, setGameWon, setGuesses, setHints, setIsWorking } from "@/src/redux/features/operator-slice";
import useLocalStorage from "./operatorQuizPage.utils";
import NextQuizButton from "@/src/components/quiz/next-quiz-button/nextQuizButton";
import { useRouter } from 'next/navigation'
import PageLayout from "@/src/layouts/page-layout/pageLayout";
import LoadingPage from "@/src/components/other/loading-page/loadingPage";


interface IOperatorQuizPage {
    operatorHeaderMap: OperatorHeaderMap
}

const OperatorQuizPage: React.FC<IOperatorQuizPage> = (props) => {
    const { operatorHeaderMap } = props;
    const guesses = useAppSelector(state => state.operator.currentGuesses);
    const isWorking = useAppSelector(state => state.operator.isWorking);
    const quizWon = useAppSelector(state => state.operator.gameWon);
    const dispatch = useAppDispatch();
    const localstorageHook = useLocalStorage();
    const [textInputValue, setTextInputValue] = useState<string>('');
    const [syncInProgress, setSyncInProgress] = useState<boolean>(true);
    const router = useRouter();


    const sendGuess = async (value: string) => {
        if (isWorking === true) { 
            return; 
        }
        else { 
            dispatch(setErrorMsg(""));
            dispatch(setIsWorking(true)); 
        }
        
        const excludedOperatorNames = guesses.map(item => item.operator.Name);
        const selectedOperatorHeader = operatorHeaderMap
            .get(value.toUpperCase()[0])
                ?.find(item => {
                    const iU = item.Name.toUpperCase();
                    return iU.includes(value.toUpperCase()) && excludedOperatorNames.findIndex(item => item.toUpperCase() === iU) === -1 
                })
        
        if (typeof selectedOperatorHeader !== 'undefined') {
            localstorageHook.saveDateToStorage();
            const res = await submitOperatorGuess(selectedOperatorHeader.Id)

            if (res === undefined) {
                dispatch(setErrorMsg(`Error occured while submiting guess for Operator with Id: ${selectedOperatorHeader.Id}`))
                dispatch(setIsWorking(false));
                return;
            }

            setTextInputValue("")
            localstorageHook.saveCurrentGuessesToStorage([res ,...guesses]);
            dispatch(setIsWorking(false));
            dispatch(addGuess(res));
            
            // Quiz is won
            if (res.isCorrect) {
                localstorageHook.saveStatusToStorage(res.isCorrect)
                dispatch(setGameWon(res.isCorrect));
            }
        }
        else {
            dispatch(setErrorMsg(`Selected OperatorHeader not found, value was: ${value}`));
            dispatch(setIsWorking(false)); 
        }
    }

    const  onFormSubmit = (event: React.MouseEvent<HTMLElement>) => {
        if (event !== undefined) {
            event.preventDefault();
        }

        sendGuess(textInputValue);
    }

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTextInputValue(event.target.value);
    }

    const onSearchBarItemClick = (value: string) => {
        if (isWorking === true) { return; }
        sendGuess(value);
    }

    const toNextQuiz = () => {
        router.push('/skill');
    }

    // Load data from localstorage
    useEffect(() => {
        // Check if data is outdated
        // if so then delete current stored data
        if (localstorageHook.isDataOutdated()) {
            localstorageHook.removeCurrentGuessesFromStorage();
            localstorageHook.removeStatusFromStorage();
            localstorageHook.removeDateFromStorage();
            localstorageHook.removeHintsFromStorage();
            setSyncInProgress(false);
            return;
        }

        // Guesses
        const data = localstorageHook.getCurrentGuessesFromStorage();
        dispatch(setGuesses(data));

        // Status
        const status = localstorageHook.getStatusFromStorage();
        dispatch(setGameWon(status));

        // Hints
        const hints = localstorageHook.getHintsFromStorage();
        if (hints !== undefined) {
            dispatch(setHints(hints));
        }

        setSyncInProgress(false);

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

    if (syncInProgress) {
        return <LoadingPage/>
    }


    return (
        <PageLayout>
            <OperatorQuizMainPanel className={styles.mainPanel}/>

            {
                quizWon == false &&
                <div className={styles.search}>
                    <QuizSearchBar
                        operatorHeadersMap={operatorHeaderMap}
                        excludedOperatorNames={guesses.map(item => {
                            return (item.operator.Name)
                        })}
                        isFormDisabled={quizWon}
                        inputTextValue={textInputValue}
                        onFormSubmit={onFormSubmit}
                        onInputChange={onInputChange}
                        onResultClick={onSearchBarItemClick}
                        onEnterKeyDown={() => sendGuess(textInputValue)}
                    />
                </div>
            }

            {
                quizWon &&
                <NextQuizButton onClick={toNextQuiz} id={'nextQuizButton'}/>
            }

            <div className={styles.results}>
                {
                    guesses.length > 0 &&
                    <OperatorGuessResult guesses={guesses}/>
                }
            </div>
        </PageLayout>
    )
}

export default OperatorQuizPage;