import { useAppSelector } from '@/src/redux/hooks';
import styles from './mainPanel.module.scss';
import { fetchTodaySkillHeader, routeToSkillIcon } from '@/src/lib/serverFunctions';
import Image from 'next/image';
import { useState, useEffect, Fragment } from 'react';
import { SkillHeader } from '../../lib/types';
import QuizHeader from '@/src/components/quiz/quiz-header/quizHeader';


interface ISkillQuizMainPanel {
    id?: string
}

/** Main panel of skill quiz */
const SkillQuizMainPanel: React.FC<ISkillQuizMainPanel> = (props) => {
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
        <QuizHeader 
            id={props.id}
            headerContent='Whos skill is that?' 
            className='center'
        >
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
                        <p className={styles.resultP}>
                            This skill took you {guesses.length} {guesses.length > 1 ? 'gueses' : 'guess'}
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

export default SkillQuizMainPanel;