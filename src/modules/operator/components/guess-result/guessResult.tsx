import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { Operator, OperatorComparisonDiffrenceV2, OperatorComparisonResultV2 } from "../../lib/types";
import styles from './guessResult.module.scss';
import { routeToBranchIcon, routeToClassIcon, routeToFactionIcon, routeToOperatorIcon } from "@/src/lib/client-to-server-functions";
import Image from "next/image";
import useUtils from "./guessResult.utils";
import { useEffect } from "react";
import { addRaceToArray } from "@/src/redux/features/operator-slice";

/**
 * @param guesses contains comparison results and is type {@link OperatorComparisonResultV2}
 * @param className (optional) css class name for root container
 */
interface IOperatorGuessResult {
    guesses: OperatorComparisonResultV2[]
    className?: string | string[]
}

/**
 * Is parent component, renders table with operator comparison results
 * Headers are handled in this component and the rest of rows are handled 
 * by {@link OperatorGuessResultRow}
 */
const OperatorGuessResult: React.FC<IOperatorGuessResult> = (props) => {
    const { guesses } = props;

    return (
        <table className={`${styles.table} ${props.className ?? ''}`}>
            <tbody>
                <tr className={styles.headerRow}>
                    <th className={styles.operatorTableColumnHeader}></th>
                    <th className={styles.smallSizedColumn}>Rarity</th>
                    <th className={styles.mediumSizedColumn}>Class</th>
                    <th className={styles.smallSizedColumn}>Branch</th>
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
                            id={key}
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
interface IOperatorGuessResultRow {
    operatorData: Operator,
    diffrences: OperatorComparisonDiffrenceV2
    id: number
}

/**
 * Renders row for comparison table
 */
const OperatorGuessResultRow: React.FC<IOperatorGuessResultRow> = (props) => {
    const { operatorData, diffrences } = props;
    const dispatch = useAppDispatch();
    const raceArray = useAppSelector(state => state.operator.raceDescriptionArray);
    const currentGuesses = useAppSelector(state => state.operator.currentGuesses);
    const utils = useUtils();
    const diffrencesValues: number[] = Object.values(diffrences);

    useEffect(() => {
        const getRaceData = () => utils.getRaceData(operatorData.Race).then((res) => {
            dispatch(addRaceToArray(res))
        })

        getRaceData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentGuesses])

    return (
        <tr className={styles.resultRow + " " + (props.id === 0 ? styles.newestRow : '')}>
            <td className={styles.operatorColumn}>
                <Image 
                    src={routeToOperatorIcon(operatorData.Id)} 
                    alt={operatorData.Id}
                    height={100}
                    width={100}
                    className={styles.operatorColumn}
                />
            </td>

            <td className={utils.getClassName(diffrencesValues[0])}>
                { utils.getFieldAsString(operatorData.Rarity) }
            </td>

            <td className={styles.iconColumn + " " + utils.getClassName(diffrencesValues[1])}>
                <Image 
                    src={routeToClassIcon(operatorData.Class)} 
                    alt={operatorData.Class}
                    height={100}
                    width={100}  
                    title={operatorData.Class}              
                />
            </td>

            <td className={styles.branchColumn + " " + utils.getClassName(diffrencesValues[2])}>
                <Image 
                    src={routeToBranchIcon(operatorData.Branch,operatorData.Class)} 
                    alt={operatorData.Branch}
                    height={100}
                    width={100}
                    title={operatorData.Branch}        
                />
            </td>

            <td className={utils.getClassName(diffrencesValues[3])}>
                {utils.getFieldAsString(operatorData.Attack_Range)}
            </td>

            <td className={utils.getClassName(diffrencesValues[4])}>
                {utils.getFieldAsString(operatorData.Position)}
            </td>

            <td className={utils.getClassName(diffrencesValues[5])}>
                {utils.getFieldAsString(operatorData.Gender)}
            </td>
            
            <td className={utils.getClassName(diffrencesValues[6])}>
                { utils.getRaceDescription(operatorData.Race, raceArray) }
            </td>

            <td className={styles.factionColumn + " " + utils.getClassName(diffrencesValues[7])}>
                <Image 
                    src={routeToFactionIcon(operatorData.Faction)} 
                    alt={operatorData.Faction}
                    height={100}
                    width={100}
                    title={operatorData.Faction}        
                />
            </td>
        </tr>
    )
}

export default OperatorGuessResult;