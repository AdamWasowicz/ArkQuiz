import { urlToIcon } from "@/lib/api-access";
import { Operator } from "../../lib/types";
import Image from "next/image";
import styles from './guessResultRow.module.scss'

interface ICharacterGuessResultRowProps {
    characterData: Operator,
    diffrenceArray: number[]
}

const CharacterGuessResultRow: React.FC<ICharacterGuessResultRowProps> = (props) => {
    const { characterData, diffrenceArray } = props;

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
        characterData.Rarity,
        characterData.Class,
        characterData.Branch,
        characterData.Attack_Range,
        characterData.Position,
        characterData.Gender,
        characterData.Race,
        characterData.Faction
    ]

    return (
        <tr className={styles.resultRow}>
            <td className={styles.operatorColumn}>
                <Image 
                    src={urlToIcon(window.location.href, characterData.Id)} 
                    alt={characterData.Id}
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

export default CharacterGuessResultRow;