import { useAppSelector } from '@/src/redux/hooks';
import styles from './mainPanel.module.scss';
import { routeToOperatorIcon } from '@/src/lib/serverFunctions';
import Image from 'next/image';
import { Fragment, useState } from 'react';
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
    const gameWon = useAppSelector(state => state.operator.gameWon);
    const hints = useAppSelector(state => state.operator.hints);
    const [hintText, setHintText] = useState<string>("");


    const onHintClick = (hintNumber: number): void => {
        if (hints === undefined) {
            return;
        }

        switch (hintNumber) {
            case 1:
                setHintText(hints.trait);
                break;
            case 2:
                setHintText(`Skill is ${hints.skill.Name}`)
                break;
            case 3:
                setHintText(`Talent is ${hints.talent.Name}`)
                break;
        }
    }


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
                
                {
                    guesses.length < 3 
                    ? <h3 className={styles.amountOfGuesses}>
                        Hints available in {3 - guesses.length} guesses
                    </h3>
                    : <div className={styles.hintsContainer}>
                        <button onClick={() => onHintClick(1)}>Hint 1</button>
                        <button onClick={() => onHintClick(2)}>Hint 2</button>
                        <button onClick={() => onHintClick(3)}>Hint 3</button>
                    </div>
                }

                {
                    hintText != "" &&
                    <div className={styles.hintText}>{hintText}</div>
                }
            </Fragment>
        </QuizHeader>
    )
}

export default OperatorQuizMainPanel;