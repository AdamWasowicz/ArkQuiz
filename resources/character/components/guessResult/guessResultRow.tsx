import { urlToIcon } from "@/lib/api-access";
import { Character } from "../../lib/types";
import Image from "next/image";
import styles from './guessResultRow.module.scss'

interface IGuessResultRowProps {
    characterData: Character,
    diffrenceArray: number[]
}

const GuessResultRow: React.FC<IGuessResultRowProps> = (props) => {
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
        characterData.Attack_Range,
        characterData.Position,
        characterData.Gender,
        characterData.Race,
        characterData.Faction
    ]

    return (
        <tr>
            <td>
                <Image 
                    src={urlToIcon(window.location.href, characterData.Id)} 
                    alt={characterData.Id}
                    width={50}
                    height={50}
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

export default GuessResultRow;