import CharacterGuessResultRow from "./guessResultRow";
import { CharacterComparisonResult } from "../../lib/types";
import styles from './guessResult.module.scss';

interface ICharacterGuessResultPorps {
    guesses: CharacterComparisonResult[]
    className?: string | string[]
}

const CharacterGuessResult: React.FC<ICharacterGuessResultPorps> = (props) => {
    const { guesses } = props;

    return (
        <table className={`${styles.table} ${props.className}`}>
            <tbody>
                <tr className={styles.headerRow}>
                    <th className={styles.mediumSizedColumn}>Operator</th>
                    <th className={styles.mediumSizedColumn}>Rarity</th>
                    <th className={styles.mediumSizedColumn}>Class</th>
                    <th className={styles.mediumSizedColumn}>Branch</th>
                    <th className={styles.mediumSizedColumn}>Attack Range</th>
                    <th className={styles.mediumSizedColumn}>Position</th>
                    <th className={styles.mediumSizedColumn}>Gender</th>
                    <th className={styles.bigSizedColumn}>Race</th>
                    <th className={styles.bigSizedColumn}>Faction</th>
                </tr>

                {
                    guesses.length > 0 &&
                    guesses.map((item, key) => {
                        return <CharacterGuessResultRow
                            characterData={item.character}
                            diffrenceArray={item.differences}
                            key={key}
                        />
                    })
                }
            </tbody>
        </table>
    )
}

export default CharacterGuessResult;