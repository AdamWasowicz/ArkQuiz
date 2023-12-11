import { fetchOperatorRaceDescription } from "@/src/lib/client-to-server-functions";
import { RaceDescription } from "../../lib/types";
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
     * @returns array of {@link RaceDescription} or empty array
     */
    const getRaceData = async (data: string | string[]): Promise<RaceDescription[]> => {
        const dataAsArray = getFieldAsArray(data);

        try {
            const dataArray = await Promise.all(dataAsArray.map((item) => {
                return fetchOperatorRaceDescription(item);
            }));
            
            const output: RaceDescription[] = dataArray.filter((item) => {
                return item !== undefined;
            }) as RaceDescription[]

            return output;
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
    const getRaceDescription = (data: string | string[], raceArray: RaceDescription[]): JSX.Element => {
        // Author node:
        // All that because one operator has two races (maybe in the future there will be more)
        // At least it was fun to solve this problem
        const dataAsArray = getFieldAsArray(data);

        const components: JSX.Element[] = dataAsArray.map((race, key) => {
            const description = raceArray.find((raceArrayItem) => {
                return raceArrayItem.Race === race
            })?.Description

            return <span className={styles.span} key={key} title={description}>
                {race}
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