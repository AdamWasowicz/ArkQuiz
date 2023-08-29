import { OperatorComparisonResult, OperatorHeader } from '@/resources/character/lib/types';
import axios from 'axios';

const API_ICON_ROUTE = 'api/character/image/icon';
const API_CHARACTER_GUESS = 'api/character';

export const fetchAllCharactersHeaders = async (siteUrl: string): Promise<OperatorHeader[]> => {
    const apiEndpointRoute = 'api/character/headers';
    const axiosClient = axios.create({
        baseURL: siteUrl,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    const response = await axiosClient.get<OperatorHeader[]>(apiEndpointRoute);
    if (response.status != 200) {
        throw new Error('Cannot get characters headers')
    }

    return response.data;
}

export const urlToIcon = (baseUrl: string, id: string): string => {
    return `${baseUrl}${API_ICON_ROUTE}/${id}`
}

export const submitCharacterGuess = async (id: string, baseUrl: string = window.location.href): Promise<OperatorComparisonResult> => {
    const axiosClient = axios.create({
        baseURL: baseUrl,
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const response = await axiosClient.post<OperatorComparisonResult>(API_CHARACTER_GUESS, {id: id,})
    return response.data;
}
