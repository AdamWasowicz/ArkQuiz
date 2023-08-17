import { CharacterHeader } from '@/resources/data/characters/lib/types';
import axios from 'axios';

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

export const fetchCharacterSplash = async(baseUrl: string, id: string) => {
    
}