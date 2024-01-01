"use client"
import { OperatorHeaderMap } from "@/src/modules/operator/lib/types";
import { submitSkillGuess } from "@/src/lib/client-to-server-functions";
import styles from './skillQuizPage.module.scss';
import QuizSearchBar from "@/src/components/quiz/quiz-search-bar/searchBar";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { ChangeEvent, useState } from "react";
import { addGuess, setErrorMsg, setGameWon, setGuesses, setIsWorking } from "@/src/redux/features/skill-slice";
import GuessResult from "@/src/modules/skill/components/guess-result/guessResult";
import SkillQuizMainPanel from "@/src/modules/skill/components/main-panel/mainPanel";
import { SkillComparisonResult } from "@/src/modules/skill/lib/types";
import useLocalstorage from './skillQuizPage.utils';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import NextQuizButton from "@/src/components/quiz/next-quiz-button/nextQuizButton";
import PageLayout from "@/src/layouts/page-layout/pageLayout";
import useRecapLocalStorage from "../recap-page/recapPage.utils";


interface ISkillPage {
    operatorHeaderMap: OperatorHeaderMap
}

const SkillQuizPage: React.FC<ISkillPage> = (props) => {
    const { operatorHeaderMap } = props;
    const guesses: SkillComparisonResult[] = useAppSelector(state => state.skill.currentGuesses);
    const quizWon: boolean = useAppSelector(state => state.skill.gameWon);
    const isWorking: boolean = useAppSelector(state => state.skill.isWorking);
    const dispatch = useAppDispatch();
    const localstorageHook = useLocalstorage();
    const [textInputValue, setTextInputValue] = useState<string>('');
    const router = useRouter();
    const recapHook = useRecapLocalStorage();

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
            localstorageHook.saveSkillDateToStorage();
            const res = await submitSkillGuess(selectedOperatorHeader.Id)

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
                recapHook.updateSkill(newState);
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
        router.push('/talent');
    }

    // Load data from localstorage
    useEffect(() => {
        // Check if data is outdated
        // if so then delete current stored data
        if (localstorageHook.isDataOutdated()) {
            localstorageHook.removeCurrentGuessesFromStorage();
            localstorageHook.removeStatusFromStorage();
            localstorageHook.removeSkillDateFromStorage();
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
            <SkillQuizMainPanel/>

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
                <NextQuizButton onClick={toNextQuiz} id={'nextQuizButton'}/>
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

export default SkillQuizPage;