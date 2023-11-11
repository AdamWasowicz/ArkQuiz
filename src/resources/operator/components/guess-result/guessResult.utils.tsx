import { getOperatorRaceDescription } from "@/src/lib/serverFunctions";
import { OperatorRaceDescription } from "../../lib/types";
import styles from './guessResult.module.scss';
import { Fragment } from 'react';

const useUtils = () => {
    /**
     * @param value indicates state of that table cell
     * @returns css class name
     */
    const getClassName = (value: number): string => {
        if (value === 1) return styles.correct;
        if (value === 0) return styles.partial;
        return styles.wrong;
    }

    /**
     * If given values could be string or string[] then this function will transform into string
     */
    const getFieldAsString = (value: string | string[] | number): string => {
        if (typeof value === 'object') {
            return (value as string[]).join(', ')
        }

        return value as string;
    }

    /**
     * If given values could be string or string[] then this function will transform into string[]
     */
    const getFieldAsArray = (data: string | string[]) => {
        let dataAsArray: string[] = [];
        if (typeof data === 'string') {
            dataAsArray = [data];
        }
        else if (typeof data === 'object') {
            dataAsArray = [...data];
        }

        return dataAsArray;
    }

    /**
     * @param data contains race or races of given operator
     * @returns array of {@link OperatorRaceDescription} or empty array
     */
    const getRaceData = async (data: string | string[]): Promise<OperatorRaceDescription[]> => {
        const dataAsArray = getFieldAsArray(data);

        const promises: Promise<OperatorRaceDescription>[]  = dataAsArray.map((item) => {
                return getOperatorRaceDescription(item)
        })

        try {
            const dataArray = await Promise.all(promises);
            return dataArray;
        }
        catch (exception) {
            console.log(`Could not fetch race data for ${data}`)
            return []
        }
    }

    /**
     * @param data Races names
     * @param raceArray Races description
     * @returns JSX.Element representing races
     */
    const getRaceDescription = (data: string | string[], raceArray: OperatorRaceDescription[]): JSX.Element => {
        // Author node:
        // All that because one operator has two races (maybe in the future there will be more)
        // At least it was fun to solve this problem
        const dataAsArray = getFieldAsArray(data);

        const components: JSX.Element[] = dataAsArray.map((item, key) => {
            const description = raceArray.find((obj) => {return obj.Race === item})?.Description
            return <span className={styles.span} key={key} title={description}>
                {item}
            </span>
        })

        let finalResult: JSX.Element[] = [];
        const comma = <span>, </span>
        components.forEach((item, index) => {
            finalResult = [...finalResult, item];
            if (index == components.length - 2) {
                finalResult = [...finalResult, comma];
            }
        }) 
        
        return <Fragment>
            {
                finalResult.map((item, key) => {
                    return <span key={key}>{item}</span>
                })
            }
        </Fragment>
    }

    return {
        getClassName, getFieldAsString,
        getFieldAsArray, getRaceDescription,
        getRaceData
    }
}

export default useUtils;