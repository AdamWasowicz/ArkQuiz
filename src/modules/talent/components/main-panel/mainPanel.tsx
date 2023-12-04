import { useAppSelector } from '@/src/redux/hooks';
import styles from './mainPanel.module.scss';
import { fetchTodayTalentHeader } from '@/src/lib/serverFunctions';
import { useState, useEffect, Fragment } from 'react';
import { TalentHeader } from '../../lib/types';
import QuizHeader from '@/src/components/quiz/quiz-header/quizHeader';


const TalentQuizMainPanel: React.FC = () => {
    const guesses = useAppSelector(state => state.talent.currentGuesses);
    const gameWon = useAppSelector(state => state.talent.gameWon)
    const [talentHeader, setTalentHeader] = useState<TalentHeader | undefined>(undefined);


    useEffect(() => {
        fetchTodayTalentHeader()
            .then((data) => {
                setTalentHeader(data);
            })
    }, [])


    return (
        <QuizHeader headerContent='Whos talent is that?' className='center'>
            <Fragment>
                {
                    talentHeader !== undefined &&
                    <div className={styles.talentDescription}>
                        {talentHeader.Description}
                    </div>
                }

                {
                    gameWon == true
                    ? <div className={styles.result}>
                        <h4 className={styles.resultHeader}>Today talent was</h4>
                        <h4 className={styles.talentName}>{talentHeader?.Name}</h4>
                        <p className={styles.resultP}>
                            This talent took you {guesses.length} {guesses.length > 1 ? 'guesses' : 'guess'}
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

export default TalentQuizMainPanel;