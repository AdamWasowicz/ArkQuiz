import { OperatorComparisonResult, OperatorHeader } from '@/resources/operator/lib/types';
import axios from 'axios';
import { LOCAL_PATH_TO_OPERATOR_ICONS } from './paths';
import path from 'path';

const API_OPERATOR_GUESS = 'api/operator';
const API_OPERATOR_HEADERS = 'api/operator/headers'

export const fetchAllOperatorHeaders = async (): Promise<OperatorHeader[]> => {
    const axiosClient = axios.create({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    const response = await axiosClient.get<OperatorHeader[]>(API_OPERATOR_HEADERS);
    if (response.status != 200) {
        throw new Error('Cannot get operator headers')
    }

    return response.data;
}

export const getUrlToOperatorIcon = (id: string): string => {
    return `${path.join(...LOCAL_PATH_TO_OPERATOR_ICONS)}/${id}.webp`
}

export const submitOperatorGuess = async (id: string, timestamp: Date = new Date(), ): Promise<OperatorComparisonResult> => {
    const axiosClient = axios.create({
        headers: {
            'Content-Type': 'application/json'
        }
    })

    console.log(window.location)

    const response = await axiosClient.post<OperatorComparisonResult>(
        API_OPERATOR_GUESS, 
        {
            id: id, 
            timestamp: timestamp.toString()
        }
    )

    return response.data;
}
