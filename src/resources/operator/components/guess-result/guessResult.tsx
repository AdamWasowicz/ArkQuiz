import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { Operator, OperatorComparisonResult } from "../../lib/types";
import styles from './guessResult.module.scss';
import { routeToOperatorIcon } from "@/src/lib/serverFunctions";
import Image from "next/image";
import useUtils from "./guessResult.utils";
import { useEffect } from "react";
import { addRaceToArray } from "@/src/redux/features/operator-slice";

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
                    src={routeToOperatorIcon(operatorData.Id)} 
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

export default OperatorGuessResult;