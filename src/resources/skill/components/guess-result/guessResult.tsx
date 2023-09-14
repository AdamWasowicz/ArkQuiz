import { SkillComparisonResult } from "../../lib/types";
import styles from './guessResult.module.scss';


// GuessResult
interface IGuessResult {
    guesses: SkillComparisonResult[]
    className?: string
}

const GuessResult: React.FC<IGuessResult> = (props) => {
    return (
        <table className={styles.table}>
            <tbody>
                { props.guesses.map((item, key) => <GuessResultRow key={key} guess={item}/>) }
            </tbody>
        </table>
    )
}
export default GuessResult;


// GuessResultRow
interface IGuessResultRow {
    guess: SkillComparisonResult
}

const GuessResultRow: React.FC<IGuessResultRow> = (props) => {
    return (
        <tr className={props.guess.IsCorrect ? styles.guessRight : styles.guessWrong}>
            { props.guess.Header.Name}
        </tr>
    )
}