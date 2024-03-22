import { OperatorComparisonDiffrenceV2, OperatorComparisonResultV2, OperatorHeader, OperatorHints, RaceDescription } from '@/src/modules/operator/lib/types';
import axios from 'axios';
import { LOCAL_PATH_TO_BRANCH_ICONS, LOCAL_PATH_TO_CLASS_ICONS, LOCAL_PATH_TO_FACTION_ICONS, LOCAL_PATH_TO_OPERATOR_ICONS, LOCAL_PATH_TO_SKILL_ICONS } from './paths';
import path from 'path';
import { SkillComparisonResult, SkillHeader, SkillHints } from '../modules/skill/lib/types';
import { TalentComparisonResult, TalentHeader, TalentHints } from '../modules/talent/lib/types';

const SERVER_ROUTE_TO_OPERATOR_GUESS = 'api/operator';
const SERVER_ROUTE_TO_OPERATOR_HEADERS = 'api/operator/headers';
const SERVER_ROUTE_TO_OPERATOR_RACE = 'api/operator/race';
const SERVER_ROUTE_TO_OPERATOR_HINTS = 'api/operator/hint';
const SERVER_ROUTE_TO_SKILL_GUESS = 'api/skill';
const SERVER_ROUTE_TO_SKILL_HINTS = 'api/skill/hint';
const SERVER_ROUTE_TO_TALENT_GUESS = 'api/talent';
const SERVER_ROUTE_TO_TALENT_HINTS = 'api/talent/hint';

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

export const routeToClassIcon = (id: string): string => {
    return `${path.join(...LOCAL_PATH_TO_CLASS_ICONS)}/${id}.webp`
}

export const routeToBranchIcon = (branch: string, cName: string): string => {
    const fileName = `${branch.trim().replace(' ', '_')}_${cName}`;
    const output = `${path.join(...LOCAL_PATH_TO_BRANCH_ICONS)}/${fileName}.webp`;

    return output;
}

export const routeToFactionIcon = (factionName: string): string => {
    const fileName = `${factionName.trim().replace(' ', '_')}`;
    const output = `${path.join(...LOCAL_PATH_TO_FACTION_ICONS)}/${fileName}.webp`;

    return output; 
}

// Operator
/** 
 * Try submiting Operator guiz guess 
 * @param id Id of operator
 * @param timestamp (optional) answer for that time
 * */
export const submitOperatorGuess = async (id: string): Promise<OperatorComparisonResultV2 | undefined> => {
    const axiosClient = axios.create({
        headers: { 'Content-Type': 'application/json' }
    })

    const response = await axiosClient.post<OperatorComparisonResultV2>(
        SERVER_ROUTE_TO_OPERATOR_GUESS, 
        { id: id, timestamp: new Date().toString() }
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
export const fetchOperatorRaceDescription = async (raceName: string): Promise<RaceDescription | undefined> => {
    const axiosClient = axios.create({
        headers: { 'Content-Type': 'application/json' }
    })

    const response = await axiosClient.get<RaceDescription>(
        SERVER_ROUTE_TO_OPERATOR_RACE + `/${raceName}`);

    if (response.status !== 200) {
        return undefined;
    }

    return response.data;
}

// Skill
/** 
 * Try submiting Skill guiz guess 
 * @param id Id of operator
 * @param timestamp (optional) answer for that time
 */
export const submitSkillGuess = async (id: string): Promise<SkillComparisonResult | undefined> => {
    const axiosClient = axios.create({
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const response = await axiosClient.post<SkillComparisonResult>(
        SERVER_ROUTE_TO_SKILL_GUESS, 
        {
            id: id, 
            timestamp: new Date().toString()
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

    const response = await axiosClient.get<SkillHeader>(SERVER_ROUTE_TO_SKILL_GUESS, {
        params: {
            timestamp: new Date().toString()
        }
    })

    if (response.status !== 200) {
        return undefined;
    }

    return response.data;
}

// Talent
export const submitTalentGuess = async (id: string, timestamp: Date = new Date()): Promise<TalentComparisonResult | undefined> => {
    const axiosClient = axios.create({
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const response = await axiosClient.post<TalentComparisonResult>(
        SERVER_ROUTE_TO_TALENT_GUESS,
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

export const fetchTodayTalentHeader = async (): Promise<TalentHeader | undefined> => {
    const axiosClient = axios.create({
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const response = await axiosClient.get<TalentHeader>(SERVER_ROUTE_TO_TALENT_GUESS, {
        params: {
            timestamp: new Date().toString()
        }
    });

    if (response.status !== 200) {
        return undefined;
    }

    return response.data;
}

// Hints
export const fetchTodayOperatorHints = async (cs: OperatorComparisonDiffrenceV2): Promise<OperatorHints | undefined> => {
    const axiosClient = axios.create({
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const response = await axiosClient.get<OperatorHints>(SERVER_ROUTE_TO_OPERATOR_HINTS, {
        params: {
            timestamp: new Date().toString(),
            currentState: JSON.stringify(cs)
        }
    });

    if (response.status !== 200) {
        return undefined;
    }

    return response.data;
}

export const fetchTodaySkillHints = async(): Promise<SkillHints | undefined> => {
    const axiosClient = axios.create({
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const response = await axiosClient.get<SkillHints>(SERVER_ROUTE_TO_SKILL_HINTS, {
        params: {
            timestamp: new Date().toString(),
        }
    });

    if (response.status !== 200) {
        return undefined;
    }

    return response.data;
}

export const fetchTodayTalentlHints = async(): Promise<SkillHints | undefined> => {
    const axiosClient = axios.create({
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const response = await axiosClient.get<TalentHints>(SERVER_ROUTE_TO_TALENT_HINTS, {
        params: {
            timestamp: new Date().toString(),
        }
    });

    if (response.status !== 200) {
        return undefined;
    }

    return response.data;
}