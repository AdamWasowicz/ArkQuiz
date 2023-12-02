import { useAppSelector } from '@/src/redux/hooks';
import styles from './mainPanel.module.scss';
import { fetchTodaySkillHeader, routeToSkillIcon } from '@/src/lib/serverFunctions';
import Image from 'next/image';
import { useState, useEffect, Fragment } from 'react';
import { SkillHeader } from '../../lib/types';
import QuizHeader from '@/src/components/quiz-header/quizHeader';


/** Main panel of skill quiz */
const MainPanel: React.FC = () => {
    const guesses = useAppSelector(state => state.skill.currentGuesses);
    const gameWon = useAppSelector(state => state.skill.gameWon)
    const [skillHeader, setSkillHeader] = useState<SkillHeader | undefined>(undefined);
    
    useEffect(() => {
        fetchTodaySkillHeader()
            .then((data) => {
                setSkillHeader(data);
            })
    }, [])

    return (
        <QuizHeader headerContent='Whos skill is that?' className='center'>
            <Fragment>
                {
                    skillHeader !== undefined &&
                    <Image
                        className={styles.image}
                        src={routeToSkillIcon(skillHeader)}
                        alt={skillHeader.Id}
                        width={150}
                        height={150}
                    />
                }

                {
                    gameWon == true
                    ? <div className={styles.result}>
                        <h4 className={styles.resultHeader}>Today skill was</h4>
                        <h4 className={styles.skillName}>{skillHeader?.Name}</h4>
                        <p className={styles.resultP}>This skill took you {guesses.length} guesses</p>
                    </div>
                    : <h3 className={styles.amountOfGuesses}>
                        Current number of guesses: <span>{guesses.length}</span>
                    </h3>
                }
            </Fragment>
        </QuizHeader>
    )
}

export default MainPanel;