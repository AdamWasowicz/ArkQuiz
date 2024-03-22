import { useAppSelector } from '@/src/redux/hooks';
import styles from './mainPanel.module.scss';
import { fetchTodayTalentHeader, fetchTodayTalentlHints, routeToOperatorIcon } from '@/src/lib/client-to-server-functions';
import { useState, useEffect, Fragment } from 'react';
import { TalentHeader, TalentHints } from '../../lib/types';
import QuizMainPanelLayout from '@/src/layouts/quiz-main-panel-layout/quizMainPanelLayout';
import Image from 'next/image';
import { setHints } from '@/src/redux/features/talent-slice';
import Hints from '@/src/components/quiz/hints/hints';
import { useDispatch } from 'react-redux';
import useLocalStorage from '@/src/page/talent-page/talentQuizPage.utils';


const TalentQuizMainPanel: React.FC = () => {
    const guesses = useAppSelector(state => state.talent.currentGuesses);
    const gameWon = useAppSelector(state => state.talent.gameWon);
    const hints = useAppSelector(state => state.talent.hints);
    const [talentHeader, setTalentHeader] = useState<TalentHeader | undefined>(undefined);
    const [areHintsLoading, setAreHintsLoading] = useState<boolean>(false);
    const localstorageHook = useLocalStorage();
    const dispatch = useDispatch();

    const fetchHints = () => {
        setAreHintsLoading(true);

        // get from localstorage
        const sh: TalentHints = localstorageHook.getHintsFromStorage() as TalentHints;
        if (sh !== undefined) {
            dispatch(setHints(sh));
            setAreHintsLoading(false);
            return;
        }

        // fetch
        fetchTodayTalentlHints()
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

                {
                    gameWon === false &&
                    <Hints
                        currentNumberForHints={guesses.length}
                        requiredNumberForHints={5}
                        hints={hints === undefined ? undefined : [
                            {
                                buttonLabel: 'Name',
                                hintText: hints?.Name ?? ''
                            },

                            {
                                buttonLabel: 'Faction',
                                hintText: hints?.OperatorFaction ?? ''
                            },

                            {
                                buttonLabel: 'Branch',
                                hintText: hints?.OperatorBranch ?? ''
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

export default TalentQuizMainPanel;