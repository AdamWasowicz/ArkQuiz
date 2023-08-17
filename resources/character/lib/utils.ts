import { Character, CharacterHeader, CharacterHeaderMap } from "./types";
import path from 'path';
import { getAllFileNamesInDirectory, readJson, doesFileExist } from "@/lib/filesystem";
import { 
    EXTERNAL_PATH_TO_CHARACTER_ICONS,
    LOCAL_PATH_TO_CHARACTER_ICONS, 
    EXTERNAL_PATH_TO_CHARACTER_SPLASH, 
    LOCAL_PATH_TO_CHARACTER_SPLASH,
    PATH_TO_CHARACTER_DATA, 
} from "@/lib/paths";

// Const
const imageFormat = '.webp';
const characterDataFormat = '.json';
const localPathToCharacters = path.join(process.cwd(), ...PATH_TO_CHARACTER_DATA);
const pathToCharacterSplash = path.join(...EXTERNAL_PATH_TO_CHARACTER_SPLASH)
const pathToCharacterIcon = path.join(...EXTERNAL_PATH_TO_CHARACTER_ICONS)


// Functions
/**
 * 
 * @param id is unique string for each character (ex. R001 is Amiya).
 * @returns Character with that id
 */
export const findCharacterById = (id: string): Character => {
    const fileExist = doesFileExist(path.join(localPathToCharacters, id + characterDataFormat))
    if (fileExist == false) {
        throw new Error(`File ${id + characterDataFormat} not found`)
    }

    const character = readJson(path.join(localPathToCharacters, id + characterDataFormat)) as Character;
    return character;
}

/**
 * @returns array of CharacterHeader for all characters.
 */
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

/**
 * 
 * @param id is unique string for each character (ex. R001 is Amiya).
 * @returns route for character splash art, you may need to add '/' for nextjs's Image component
 */
export const getCharacterSplashRoute = (id: string): string => {
    const fullPath = path.join(process.cwd(), pathToCharacterSplash, id + imageFormat)
    const fileExist = doesFileExist(fullPath)
    
    if (fileExist == false) {
        throw new Error(`Splash ${fullPath} not found`)
    }

    const route = path.join(...LOCAL_PATH_TO_CHARACTER_SPLASH, id + imageFormat);
    return route;
}

/**
 * 
 * @param id is unique string for each character (ex. R001 is Amiya).
 * @returns route for character icon art, you may need to add '/' for nextjs's Image component
 */
export const getCharacterIconRoute = (id: string): string => {
    const fileExist = doesFileExist(path.join(process.cwd(), pathToCharacterIcon, id + imageFormat))
    
    if (fileExist == false) {
        throw new Error(`Icon ${id + imageFormat} not found`)
    }

    const route = path.join(...LOCAL_PATH_TO_CHARACTER_ICONS, id + imageFormat);
    return route;
}

/**
 * @returns array of FileNames, they are in format `ID.json`
 */
export const getAllCharactersFileNames = (): string[] => {
    const fileNames: string[] = getAllFileNamesInDirectory(localPathToCharacters);
    return fileNames;
}

/**
 * @returns Id of today character
 */
export const getTodayCharacterId = (): string => {
    const date = new Date();
    const seed: number = date.getMonth() * date.getDate() + date.getDate()

    // Character data
    const characters: string[] = getAllCharactersFileNames();
    const amountOfCharacters = characters.length;

    const indexOfCharacterArray = seed % amountOfCharacters;
    // characters array has filenames in ID.json format so we need ignore .json
    const id = characters[indexOfCharacterArray].split('.')[0];

    return id;
}

export const getAllCharactersHeaderMap = (): CharacterHeaderMap => {
    const headerMap: CharacterHeaderMap = new Map<string, CharacterHeader[]>();
    const charactersHeaders = getAllCharacterHeaders();

    charactersHeaders.forEach(header => {
        const firstLetterOfName = header.Name[0]
        const characterHeaderArray = headerMap.get(firstLetterOfName)

        // If there is no array yet, then create it and populate with first header.
        if (typeof characterHeaderArray === 'undefined') {
            headerMap.set(firstLetterOfName, [header])
        }
        else {
            characterHeaderArray.push(header);
        }
    })

    return headerMap;
}