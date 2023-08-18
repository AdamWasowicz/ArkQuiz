import { CharacterComparisonResult, CharacterHeader } from '@/resources/character/lib/types';
import axios from 'axios';

const API_SPLASH_ROUTE = 'api/character/image/splash';
const API_ICON_ROUTE = 'api/character/image/icon';
const API_CHARACTER_GUESS = 'api/character';

// REMOVE OR MOD
export const fetchAllCharactersHeaders = async (siteUrl: string): Promise<CharacterHeader[]> => {
    const apiEndpointRoute = 'api/character/headers';
    const axiosClient = axios.create({
        baseURL: siteUrl,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    const response = await axiosClient.get<CharacterHeader[]>(apiEndpointRoute);
    if (response.status != 200) {
        throw new Error('Cannot get characters headers')
    }

    return response.data;
}

export const urlToSplash = (baseUrl: string, id: string): string => {
    return `${baseUrl}${API_SPLASH_ROUTE}/${id}`
}

export const urlToIcon = (baseUrl: string, id: string): string => {
    return `${baseUrl}${API_ICON_ROUTE}/${id}`
}

export const takeGuess = async (baseUrl: string, id: string): Promise<CharacterComparisonResult> => {
    const axiosClient = axios.create({
        baseURL: baseUrl,
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const response = await axiosClient.post<CharacterComparisonResult>(API_CHARACTER_GUESS, {id: id,})
    return response.data;
}
