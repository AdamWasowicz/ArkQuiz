import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import styles from './mainPanel.module.scss';
import { fetchTodayOperatorHints, routeToOperatorIcon } from '@/src/lib/client-to-server-functions';
import Image from 'next/image';
import { Fragment, useState } from 'react';
import Hints from '@/src/components/quiz/hints/hints';
import { specifyUndiscoveredOperatorTraits } from '../../lib/client-utils';
import { setHints } from '@/src/redux/features/operator-slice';
import useLocalStorage from "../../../../page/operator-page/operatorQuizPage.utils";
import QuizMainPanelLayout from '@/src/layouts/quiz-header-layout/quizMainPanelLayout';
import QuizHeader from '@/src/components/ui/quiz-header/quizHeader';

interface IOperatorQuizMainPanel {
    id?: string,
    className?: string
}

/**
 * Top part of that quiz, displays name of quiz, answer if guessed correctly, number of tries and hints
 */
const OperatorQuizMainPanel: React.FC<IOperatorQuizMainPanel> = (props) => {
    const guesses = useAppSelector(state => state.operator.currentGuesses);
    const gameWon = useAppSelector(state => state.operator.gameWon);
    const hints = useAppSelector(state => state.operator.hints);
    const localstorageHook = useLocalStorage();
    const dispatch = useAppDispatch();

    const [areHintsLoading, setAreHintsLoading] = useState<boolean>(false);

    const fetchHints = () => {
        const currentState = specifyUndiscoveredOperatorTraits(guesses);

        setAreHintsLoading(true);
        fetchTodayOperatorHints(currentState)
            .then((result) => {
                if (result !== undefined) {
                    localstorageHook.saveHintsToStorage(result);
                    dispatch(setHints(result));
                }
            })
            .finally(() => {
                setAreHintsLoading(false);
            })
    }

    return (
        <QuizMainPanelLayout id={props.id} className={props.className}>
            <QuizHeader>Guess the operator</QuizHeader>

            <Fragment>
                {
                    gameWon === true 
                    ? <div className={styles.result}>
                        <h4 className={styles.resultHeader}>Today operator was</h4>

                        <Image
                            className={styles.image}
                            src={routeToOperatorIcon(guesses[0].operator.Id)}
                            alt={guesses[0].operator.Id}
                            width={180}
                            height={180}
                        />

                        <h4 className={styles.operatorName}>{guesses[0].operator.Name}</h4>

                        <p className={styles.resultP}>
                            This operator took you {guesses.length} { guesses.length > 1 ? 'guesses' : 'guess'}
                        </p>
                    </div>
                    : <h3 className={styles.amountOfGuesses}>
                        Current number of guesses: <span>{guesses.length}</span>
                    </h3>
                }
                
                {
                    gameWon === false &&
                    <Hints
                        currentNumberForHints={guesses.length}
                        requiredNumberForHints={5}
                        hints={hints === undefined ? undefined : [
                            {
                                buttonLabel: 'Trait',
                                hintText: hints?.trait ?? ''
                            },

                            {
                                buttonLabel: 'Skill',
                                hintText: hints?.skill ?? ''
                            },

                            {
                                buttonLabel: 'Talent',
                                hintText: hints?.talent ?? ''
                            }
                        ]}
                        onLoadData={fetchHints}
                        isLoading={areHintsLoading}
                    />
                }
            </Fragment>
        </QuizMainPanelLayout>
    )
}

export default OperatorQuizMainPanel;