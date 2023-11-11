import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { Operator, OperatorComparisonDiffrenceV2, OperatorComparisonResultV2 } from "../../lib/types";
import styles from './guessResult.module.scss';
import { routeToOperatorIcon } from "@/src/lib/serverFunctions";
import Image from "next/image";
import useUtils from "./guessResult.utils";
import { useEffect } from "react";
import { addRaceToArray } from "@/src/redux/features/operator-slice";

/**
 * @param guesses contains comparison results and is type {@link OperatorComparisonResultV2}
 * @param className (optional) css class name for root container
 */
interface IOperatorGuessResultProps {
    guesses: OperatorComparisonResultV2[]
    className?: string | string[]
}

/**
 * Is parent component, renders table with operator comparison results
 * Headers are handled in this component and the rest of rows are handled 
 * by {@link OperatorGuessResultRow}
 */
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
                            diffrences={item.diffrences}
                            key={key}
                        />
                    })
                }
            </tbody>
        </table>
    )
}

/**
 * @param operatorData contains data for that row Operator and is type {@link Operator}
 * @param diffrences contains diffrences, is type {@link OperatorComparisonDiffrenceV2}
 */
interface IOperatorGuessResultRowProps {
    operatorData: Operator,
    diffrences: OperatorComparisonDiffrenceV2
}

/**
 * Renders row for comparison table
 */
const OperatorGuessResultRow: React.FC<IOperatorGuessResultRowProps> = (props) => {
    const { operatorData, diffrences } = props;
    const dispatch = useAppDispatch();
    const raceArray = useAppSelector(state => state.operator.raceDescriptionArray);
    const currentGuesses = useAppSelector(state => state.operator.currentGuesses);
    const utils = useUtils();

    const dataToDisplay = [
        operatorData.Rarity,
        operatorData.Class,
        operatorData.Branch,
        operatorData.Attack_Range,
        operatorData.Position,
        operatorData.Gender,
    ]

    const diffrencesValues: number[] = Object.values(diffrences);

    useEffect(() => {
        const getRaceData = () => utils.getRaceData(operatorData.Race).then((res) => {
            dispatch(addRaceToArray(res))
        })

        getRaceData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                            className={utils.getClassName(diffrencesValues[key])}
                        >
                            {utils.getFieldAsString(value)}
                        </td>
                })
            }
            
            <td className={utils.getClassName(diffrencesValues[++keyOutside])} key={keyOutside}>
                { utils.getRaceDescription(operatorData.Race, raceArray) }
            </td>

            <td className={utils.getClassName(diffrencesValues[++keyOutside])} key={keyOutside}>
                { operatorData.Faction }
            </td>
        </tr>
    )
}

export default OperatorGuessResult;