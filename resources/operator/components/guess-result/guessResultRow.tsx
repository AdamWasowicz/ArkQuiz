import { urlToIcon } from "@/lib/apiAccess";
import { Operator } from "../../lib/types";
import Image from "next/image";
import styles from './guessResultRow.module.scss'

interface IOperatorGuessResultRowProps {
    operatorData: Operator,
    diffrenceArray: number[]
}

const OperatorGuessResultRow: React.FC<IOperatorGuessResultRowProps> = (props) => {
    const { operatorData, diffrenceArray } = props;

    const getClassName = (value: number): string => {
        if (value === 1) return styles.correct;
        if (value === 0) return styles.partial;
        return styles.wrong;
    }

    const formatValue = (value: unknown): string => {
        if (typeof value === 'object') {
            return (value as string[]).join(', ')
        }

        return value as string;
    }

    const dataToDisplay = [
        operatorData.Rarity,
        operatorData.Class,
        operatorData.Branch,
        operatorData.Attack_Range,
        operatorData.Position,
        operatorData.Gender,
        operatorData.Race,
        operatorData.Faction
    ]

    return (
        <tr className={styles.resultRow}>
            <td className={styles.operatorColumn}>
                <Image 
                    src={urlToIcon(window.location.href, operatorData.Id)} 
                    alt={operatorData.Id}
                    height={100}
                    width={100}
                    className={styles.operatorColumn}
                />
            </td>
            {
                dataToDisplay.map((value, key) => {
                    return <td 
                            key={key}
                            className={getClassName(diffrenceArray[key])}
                        >
                            {formatValue(value)}
                        </td>
                })
            }
        </tr>
    )
}

export default OperatorGuessResultRow;