import { useAppSelector } from '@/redux/hooks';
import styles from './mainPanel.module.scss';
import { urlToIcon } from '@/lib/apiAccess';
import Image from 'next/image';

interface IMainPanelProps {
    className?: string | string[]
}

const MainPanel: React.FC<IMainPanelProps> = (props) => {
    const guesses = useAppSelector(state => state.operator.currentGuesses);
    const gameWon = useAppSelector(state => state.operator.gameWon)

    return (
        <div className={`${styles.mainPanel} ${props.className}`}>
            <h2 className={styles.header}>Guess the operator</h2>

            {
                gameWon &&
                <div className={styles.result}>
                    <h4 className={styles.resultHeader}>Today operator was</h4>

                    <Image
                        className={styles.image}
                        src={urlToIcon(window.location.href,guesses[0].operator.Id)}
                        alt={guesses[0].operator.Id}
                        width={180}
                        height={180}
                    />

                    <h4 className={styles.operatorName}>{guesses[0].operator.Name}</h4>

                    <p className={styles.resultP}>This operator took you {guesses.length} guesses</p>
                </div>
            }

            {
                gameWon == false &&
                <h3 className={styles.amountOfGuesses}>Current amount of guesses: <span>{guesses.length}</span></h3>
            }
        </div>
    )
}

export default MainPanel;