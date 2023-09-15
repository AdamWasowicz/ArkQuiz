import { OperatorComparisonResult, OperatorHeader, OperatorRaceDescription } from '@/src/resources/operator/lib/types';
import axios from 'axios';
import { LOCAL_PATH_TO_OPERATOR_ICONS, LOCAL_PATH_TO_SKILL_ICONS } from './paths';
import path from 'path';
import { SkillComparisonResult, SkillHeader } from '../resources/skill/lib/types';

const SERVER_ROUTE_TO_OPERATOR_GUESS = 'api/operator';
const SERVER_ROUTE_TO_OPERATOR_HEADERS = 'api/operator/headers';
const SERVER_ROUTE_TO_OPERATOR_RACE = 'api/operator/race';
const SERVER_ROUTE_TO_SKILL_GUESS = 'api/skill';

export const fetchAllOperatorHeaders = async (): Promise<OperatorHeader[]> => {
    const axiosClient = axios.create({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    const response = await axiosClient.get<OperatorHeader[]>(SERVER_ROUTE_TO_OPERATOR_HEADERS);
    if (response.status != 200) {
        throw new Error('Cannot get operator headers')
    }

    return response.data;
}

export const routeToOperatorIcon = (id: string): string => {
    return `${path.join(...LOCAL_PATH_TO_OPERATOR_ICONS)}/${id}.webp`
}

export const routeToSkillIcon = (header: SkillHeader): string => {
    return `${path.join(...LOCAL_PATH_TO_SKILL_ICONS)}/${header.Id}_${header.Number}.webp`
}

export const submitOperatorGuess = async (id: string, timestamp: Date = new Date(), ): Promise<OperatorComparisonResult> => {
    const axiosClient = axios.create({
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const response = await axiosClient.post<OperatorComparisonResult>(
        SERVER_ROUTE_TO_OPERATOR_GUESS, 
        {
            id: id, 
            timestamp: timestamp.toString()
        }
    )

    return response.data;
}

export const getOperatorRaceDescription = async (raceIn: string): Promise<OperatorRaceDescription> => {
    const axiosClient = axios.create({
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const response = await axiosClient.get<OperatorRaceDescription>(
        SERVER_ROUTE_TO_OPERATOR_RACE + `/${raceIn}`);

    return response.data;
}

export const submitSkillGuess = async (id: string, timestamp: Date = new Date(), ): Promise<SkillComparisonResult> => {
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

    return response.data;
}

export const fetchTodaySkillHeader = async (): Promise<SkillHeader> => {
    const axiosClient = axios.create({
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const response = await axiosClient.get<SkillHeader>(SERVER_ROUTE_TO_SKILL_GUESS)
    return response.data;
}
