import { useAppSelector } from '@/src/redux/hooks';
import styles from './mainPanel.module.scss';
import { fetchTodaySkillHeader, fetchTodaySkillHints, routeToOperatorIcon, routeToSkillIcon } from '@/src/lib/client-to-server-functions';
import Image from 'next/image';
import { useState, useEffect, Fragment } from 'react';
import { SkillHeader } from '../../lib/types';
import QuizMainPanelLayout from '@/src/layouts/quiz-main-panel-layout/quizMainPanelLayout';
import Hints from '@/src/components/quiz/hints/hints';
import useLocalstorage from '@/src/page/skill-page/skillQuizPage.utils';
import { useDispatch } from 'react-redux';
import { setHints } from '@/src/redux/features/skill-slice';


interface ISkillQuizMainPanel {
    id?: string,
    className?: string
}

/** Main panel of skill quiz */
const SkillQuizMainPanel: React.FC<ISkillQuizMainPanel> = (props) => {
    const guesses = useAppSelector(state => state.skill.currentGuesses);
    const gameWon = useAppSelector(state => state.skill.gameWon);
    const hints = useAppSelector(state => state.skill.hints);
    const [skillHeader, setSkillHeader] = useState<SkillHeader | undefined>(undefined);
    const [areHintsLoading, setAreHintsLoading] = useState<boolean>(false);
    const localstorageHook = useLocalstorage();
    const dispatch = useDispatch();

    const fetchHints = () => {
        setAreHintsLoading(true);

        // get from localstorage
        const sh = localstorageHook.getHintsFromStorage();
        if (sh !== undefined) {
            dispatch(setHints(sh));
            setAreHintsLoading(false);
            return;
        }

        // fetch
        fetchTodaySkillHints()
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
        fetchTodaySkillHeader()
            .then((data) => {
                setSkillHeader(data);
            })
    }, [])

    return (
        <QuizMainPanelLayout id={props.id ?? ''} className={props.className ?? ''}>
            <h1>Who has this skill?</h1>

            <Fragment>
                {
                    skillHeader !== undefined &&
                    <Image
                        className={styles.skillImage}
                        src={routeToSkillIcon(skillHeader)}
                        alt={skillHeader.Id}
                        width={150}
                        height={150}
                    />
                }

                {
                    gameWon === true &&
                    <Fragment>
                        <h3>Today skill was</h3>
                        <h2>{skillHeader?.Name}</h2>


                        <h3>It belongs to</h3>
                        <Image
                            className={styles.operatorImage}
                            src={routeToOperatorIcon(guesses[0].OperatorHeader.Id)}
                            alt={guesses[0].OperatorHeader.Id}
                            width={180}
                            height={180}
                        />
                        <h2>{guesses[0].OperatorHeader.Name}</h2>

                        <p>This skill took you {guesses.length} {guesses.length > 1 ? 'gueses' : 'guess'}</p>
                    </Fragment>
                }

                {
                    gameWon === false &&
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

export default SkillQuizMainPanel;