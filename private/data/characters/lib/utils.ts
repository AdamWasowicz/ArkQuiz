import { Character, CharacterHeader } from "./types";
import path from 'path';
import { getAllFileNamesInDirectory, readJson, doesFileExist } from "@/lib/filesystem";

// Const
const imageFormat = '.webp';
const characterDataFormat = '.json';
const localPathToCharacters = path.join(process.cwd(), 'private', 'data','characters', 'data');
const pathToCharacterSplash = path.join('images', 'characters', 'splash')
const pathToCharacterIcon = path.join('images', 'characters', 'icon')


// Functions
export const findCharacterById = (id: string): Character => {
    const fileExist = doesFileExist(path.join(localPathToCharacters, id + ".json"))
    if (fileExist == false) {
        throw new Error(`File ${id + '.json'} not found`)
    }

    const character = readJson(path.join(localPathToCharacters, id + '.json')) as Character;
    return character;
}

export const getAllCharacterHeaders = (): CharacterHeader[] => {
    const fileNames: string[] = getAllFileNamesInDirectory(localPathToCharacters);

    const characterHeaders: CharacterHeader[] = [];
    fileNames.forEach(file => {
        const character = readJson(path.join(localPathToCharacters, file)) as Character;

        const ch: CharacterHeader = {
            Id: character.Id,
            Name: character.Name,
        }

        characterHeaders.push(ch);
    })

    return characterHeaders;
}

export const getCharacterSplashRoute = (id: string): string => {
    const fileExist = doesFileExist(path.join(process.cwd(), 'public',  pathToCharacterSplash, id + imageFormat))
    
    if (fileExist == false) {
        throw new Error(`File ${id + imageFormat} not found`)
    }

    const route = path.join(pathToCharacterSplash, id + imageFormat);
    return route;
}

export const getCharacterIconRoute = (id: string): string => {
    const fileExist = doesFileExist(path.join(process.cwd(), 'public',  pathToCharacterIcon, id + imageFormat))
    
    if (fileExist == false) {
        throw new Error(`File ${id + imageFormat} not found`)
    }

    const route = path.join(pathToCharacterIcon, id + imageFormat);
    return route;
}
