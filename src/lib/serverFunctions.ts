import { OperatorComparisonResultV2, OperatorHeader, RaceDescription } from '@/src/modules/operator/lib/types';
import axios from 'axios';
import { LOCAL_PATH_TO_OPERATOR_ICONS, LOCAL_PATH_TO_SKILL_ICONS } from './paths';
import path from 'path';
import { SkillComparisonResult, SkillHeader } from '../modules/skill/lib/types';

const SERVER_ROUTE_TO_OPERATOR_GUESS = 'api/operator';
const SERVER_ROUTE_TO_OPERATOR_HEADERS = 'api/operator/headers';
const SERVER_ROUTE_TO_OPERATOR_RACE = 'api/operator/race';
const SERVER_ROUTE_TO_SKILL_GUESS = 'api/skill';

/** Try fetching all Operator headers  */
export const fetchAllOperatorHeaders = async (): Promise<OperatorHeader[] | undefined> => {
    const axiosClient = axios.create({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    const response = await axiosClient.get<OperatorHeader[]>(SERVER_ROUTE_TO_OPERATOR_HEADERS);
    if (response.status != 200) {
        return undefined;
    }

    return response.data;
}

export const routeToOperatorIcon = (id: string): string => {
    return `${path.join(...LOCAL_PATH_TO_OPERATOR_ICONS)}/${id}.webp`
}

export const routeToSkillIcon = (header: SkillHeader): string => {
    return `${path.join(...LOCAL_PATH_TO_SKILL_ICONS)}/${header.Id}_${header.Number}.webp`
}

/** 
 * Try submiting Operator guiz guess 
 * @param id Id of operator
 * @param timestamp (optional) answer for that time
 * */
export const submitOperatorGuess = async (id: string, timestamp: Date = new Date(), ): Promise<OperatorComparisonResultV2 | undefined> => {
    const axiosClient = axios.create({
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const response = await axiosClient.post<OperatorComparisonResultV2>(
        SERVER_ROUTE_TO_OPERATOR_GUESS, 
        {
            id: id, 
            timestamp: timestamp.toString()
        }
    )

    if (response.status !== 200) {
        return undefined;
    }

    return response.data;
}

/**
 * Try getting Operator race data
 * @param raceName name of race
 * @returns promise of type {@link RaceDescription} or undefined
 */
export const getOperatorRaceDescription = async (raceName: string): Promise<RaceDescription | undefined> => {
    const axiosClient = axios.create({
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const response = await axiosClient.get<RaceDescription>(
        SERVER_ROUTE_TO_OPERATOR_RACE + `/${raceName}`);

    if (response.status !== 200) {
        return undefined;
    }

    return response.data;
}

/** 
 * Try submiting Skill guiz guess 
 * @param id Id of operator
 * @param timestamp (optional) answer for that time
 */
export const submitSkillGuess = async (id: string, timestamp: Date = new Date(), ): Promise<SkillComparisonResult | undefined> => {
    const axiosClient = axios.create({
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const response = await axiosClient.post<SkillComparisonResult>(
        SERVER_ROUTE_TO_SKILL_GUESS, 
        {
            id: id, 
            timestamp: timestamp.toString()
        }
    )

    if (response.status !== 200) {
        return undefined;
    }

    return response.data;
}

/**
 * Try fetching today skill header
 * @returns promise of type {@link SkillHeader} or undefined
 */
export const fetchTodaySkillHeader = async (): Promise<SkillHeader | undefined> => {
    const axiosClient = axios.create({
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const response = await axiosClient.get<SkillHeader>(SERVER_ROUTE_TO_SKILL_GUESS)

    if (response.status !== 200) {
        return undefined;
    }

    return response.data;
}
