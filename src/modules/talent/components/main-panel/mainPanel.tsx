import { useAppSelector } from '@/src/redux/hooks';
import styles from './mainPanel.module.scss';
import { fetchTodayTalentHeader, routeToOperatorIcon } from '@/src/lib/client-to-server-functions';
import { useState, useEffect, Fragment } from 'react';
import { TalentHeader } from '../../lib/types';
import QuizMainPanelLayout from '@/src/layouts/quiz-main-panel-layout/quizMainPanelLayout';
import Image from 'next/image';


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
        <QuizMainPanelLayout>
            <h1>Who has this talent?</h1>

            <Fragment>
                {
                    talentHeader !== undefined &&
                    <div className={styles.talentDescription}>
                        {talentHeader.Description}
                    </div>
                }

                {
                    gameWon === true &&
                    <Fragment>
                        <h3>Today talent was</h3>
                        <h2>{talentHeader?.Name}</h2>

                        <h3>It belongs to</h3>
                        <Image
                            className={styles.operatorImage}
                            src={routeToOperatorIcon(guesses[0].OperatorHeader.Id)}
                            alt={guesses[0].OperatorHeader.Id}
                            width={180}
                            height={180}
                        />
                        <h2>{guesses[0].OperatorHeader.Name}</h2>

                        <p>This talent took you {guesses.length} {guesses.length > 1 ? 'guesses' : 'guess'}</p>
                    </Fragment>
                }

                {
                    gameWon == false &&
                    <p>Current number of guesses: <span>{guesses.length}</span></p>
                }
            </Fragment>
        </QuizMainPanelLayout>
    )


    // return (
    //     <QuizMainPanelLayout className='center'>
    //         <QuizHeader>Who has this talent?</QuizHeader>
            
    //         <Fragment>
    //             {
    //                 talentHeader !== undefined &&
    //                 <div className={styles.talentDescription}>
    //                     {talentHeader.Description}
    //                 </div>
    //             }

    //             {
    //                 gameWon == true
    //                 ? <div className={styles.result}>
    //                     <h4 className={styles.resultHeader}>Today talent was</h4>
    //                     <h4 className={styles.talentName}>{talentHeader?.Name}</h4>
    //                     <p className={styles.resultP}>
    //                         This talent took you {guesses.length} {guesses.length > 1 ? 'guesses' : 'guess'}
    //                     </p>
    //                 </div>
    //                 : <h3 className={styles.amountOfGuesses}>
    //                     Current number of guesses: <span>{guesses.length}</span>
    //                 </h3>
    //             }
    //         </Fragment>
    //     </QuizMainPanelLayout>
    // )
}

export default TalentQuizMainPanel;