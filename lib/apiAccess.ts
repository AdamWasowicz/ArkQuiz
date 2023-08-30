import { OperatorComparisonResult, OperatorHeader } from '@/resources/operator/lib/types';
import axios from 'axios';

const API_ICON_ROUTE = 'api/operator/image/icon';
const API_OPERATOR_GUESS = 'api/operator';

export const fetchAllOperatorHeaders = async (siteUrl: string): Promise<OperatorHeader[]> => {
    const apiEndpointRoute = 'api/operator/headers';
    const axiosClient = axios.create({
        baseURL: siteUrl,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    const response = await axiosClient.get<OperatorHeader[]>(apiEndpointRoute);
    if (response.status != 200) {
        throw new Error('Cannot get operator headers')
    }

    return response.data;
}

export const urlToIcon = (baseUrl: string, id: string): string => {
    return `${baseUrl}${API_ICON_ROUTE}/${id}`
}

export const submitOperatorGuess = async (id: string, timestamp: Date = new Date(), baseUrl: string = window.location.href): Promise<OperatorComparisonResult> => {
    const axiosClient = axios.create({
        baseURL: baseUrl,
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const response = await axiosClient.post<OperatorComparisonResult>(API_OPERATOR_GUESS, {id: id, timestamp: timestamp.toString()})
    return response.data;
}
