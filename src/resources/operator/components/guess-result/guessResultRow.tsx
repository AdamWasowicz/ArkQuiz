import { getUrlToOperatorIcon } from "@/src/lib/serverFunctions";
import { Operator } from "../../lib/types";
import Image from "next/image";
import { useEffect } from 'react';
import styles from './guessResultRow.module.scss';
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { addRaceToArray } from "@/src/redux/features/operator-slice";
import useUtils  from "./guessResultRow.utils";


interface IOperatorGuessResultRowProps {
    operatorData: Operator,
    diffrenceArray: number[]
}

const OperatorGuessResultRow: React.FC<IOperatorGuessResultRowProps> = (props) => {
    const { operatorData, diffrenceArray } = props;
    const dispatch = useAppDispatch();
    const raceArray = useAppSelector(state => state.operator.raceDescriptionArray);
    const currentGuesses = useAppSelector(state => state.operator.currentGuesses);
    const u = useUtils();

    const dataToDisplay = [
        operatorData.Rarity,
        operatorData.Class,
        operatorData.Branch,
        operatorData.Attack_Range,
        operatorData.Position,
        operatorData.Gender,
        // Moved to separate declarations
        //operatorData.Race,
        //operatorData.Faction
    ]

    useEffect(() => {
        u.getRaceData(operatorData.Race).then((res) => {
            dispatch(addRaceToArray(res))
        })
    }, [currentGuesses])

    let keyOutside: number = 0;

    return (
        <tr className={styles.resultRow}>
            <td className={styles.operatorColumn}>
                <Image 
                    src={getUrlToOperatorIcon(operatorData.Id)} 
                    alt={operatorData.Id}
                    height={100}
                    width={100}
                    className={styles.operatorColumn}
                />
            </td>

            {
                dataToDisplay.map((value, key) => {
                    keyOutside = key;
                    return <td 
                            key={key}
                            className={u.getClassName(diffrenceArray[key])}
                        >
                            {u.formatValue(value)}
                        </td>
                })
            }
            
            <td className={u.getClassName(diffrenceArray[++keyOutside])} key={keyOutside}>
                { u.getRaceDescription(operatorData.Race, raceArray) }
            </td>

            <td className={u.getClassName(diffrenceArray[++keyOutside])} key={keyOutside}>
                { operatorData.Faction }
            </td>
        </tr>
    )
}

export default OperatorGuessResultRow;