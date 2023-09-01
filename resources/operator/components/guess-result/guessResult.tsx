import OperatorGuessResultRow from "./guessResultRow";
import { OperatorComparisonResult } from "../../lib/types";
import styles from './guessResult.module.scss';

interface IOperatorGuessResultProps {
    guesses: OperatorComparisonResult[]
    className?: string | string[]
}

const OperatorGuessResult: React.FC<IOperatorGuessResultProps> = (props) => {
    const { guesses } = props;

    return (
        <table className={`${styles.table} ${props.className}`}>
            <tbody>
                <tr className={styles.headerRow}>
                    <th className={styles.smallSizedColumn}>Operator</th>
                    <th className={styles.smallSizedColumn}>Rarity</th>
                    <th className={styles.mediumSizedColumn}>Class</th>
                    <th className={styles.mediumSizedColumn}>Branch</th>
                    <th className={styles.bigSizedColumn}>Attack Range</th>
                    <th className={styles.mediumSizedColumn}>Position</th>
                    <th className={styles.mediumSizedColumn}>Gender</th>
                    <th className={styles.mediumSizedColumn}>Race</th>
                    <th className={styles.bigSizedColumn}>Faction</th>
                </tr>

                {
                    guesses.length > 0 &&
                    guesses.map((item, key) => {
                        return <OperatorGuessResultRow
                            operatorData={item.operator}
                            diffrenceArray={item.differences}
                            key={key}
                        />
                    })
                }
            </tbody>
        </table>
    )
}

export default OperatorGuessResult;