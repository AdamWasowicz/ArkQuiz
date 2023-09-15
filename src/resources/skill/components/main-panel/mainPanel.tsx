import { useAppSelector } from '@/src/redux/hooks';
import styles from './mainPanel.module.scss';
import { fetchTodaySkillHeader, routeToSkillIcon } from '@/src/lib/serverFunctions';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { SkillHeader } from '../../lib/types';

interface IMainPanel {
    className?: string
}

const MainPanel: React.FC<IMainPanel> = (props) => {
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
        <div className={styles.mainPanel + " " + props.className}>
            <h2 className={styles.header}>Whos skill is that?</h2>
            

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
                gameWon &&
                <div className={styles.result}>
                    <h4 className={styles.resultHeader}>Today skill was</h4>

                    <h4 className={styles.skillName}>{skillHeader?.Name}</h4>

                    <p className={styles.resultP}>This skill took you {guesses.length} guesses</p>
                </div>
            }

            {
                gameWon == false &&
                <h3 className={styles.amountOfGuesses}>
                    Current number of guesses: <span>{guesses.length}</span>
                </h3>
            }
        </div>
    )
}

export default MainPanel;