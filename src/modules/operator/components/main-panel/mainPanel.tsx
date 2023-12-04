import { useAppSelector } from '@/src/redux/hooks';
import styles from './mainPanel.module.scss';
import { routeToOperatorIcon } from '@/src/lib/serverFunctions';
import Image from 'next/image';
import { Fragment } from 'react';
import QuizHeader from '@/src/components/quiz/quiz-header/quizHeader';


interface IOperatorQuizMainPanel {
    id?: string,
    className?: string
}

/**
 * Top part of that quiz, displays name of quiz, answer if guessed correctly, number of tries and hints
 */
const OperatorQuizMainPanel: React.FC<IOperatorQuizMainPanel> = (props) => {
    const guesses = useAppSelector(state => state.operator.currentGuesses);
    const gameWon = useAppSelector(state => state.operator.gameWon)

    return (
        <QuizHeader
            id={props.id}
            headerContent='Guess the operator'
            className={props.className}
        >
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
            </Fragment>
        </QuizHeader>
    )
}

export default OperatorQuizMainPanel;