"use client"
import { OperatorHeaderMap } from "@/src/modules/operator/lib/types";
import { submitSkillGuess } from "@/src/lib/serverFunctions";
import styles from './skillQuizPage.module.scss';
import SearchBar from "@/src/components/search-bar/searchBar";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { ChangeEvent, useState } from "react";
import { addGuess, setErrorMsg, setGameWon, setGuesses, setIsWorking } from "@/src/redux/features/skill-slice";
import GuessResult from "@/src/modules/skill/components/guess-result/guessResult";
import MainPanel from "@/src/modules/skill/components/main-panel/mainPanel";
import { SkillComparisonResult } from "@/src/modules/skill/lib/types";
import useLocalstorage from './skillQuizPage.utils';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import NextQuizButton from "@/src/components/next-quiz-button/nextQuizButton";
import QuizMainBody from "@/src/components/quiz-main-body/quizMainBody";

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
            localstorageHook.saveSkillDateToStorage();
            const res = await submitSkillGuess(selectedOperatorHeader.Id)

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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    // Scroll to next quiz button
    useEffect(() => {
        if (quizWon === true) {
            const button = document.getElementById('nextQuizButton');
            if (button !== null) {
                button.scrollIntoView({
                    behavior: "smooth"
                })
            }
        }
    }, [quizWon])


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
        </QuizMainBody>
    )
}

export default SkillQuizPage;