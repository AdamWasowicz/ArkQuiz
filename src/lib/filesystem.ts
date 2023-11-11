import fs from 'fs';

/** 
 * @param location absolute path to directory
 * @returns array of all files in specified location 
 * */
export const getAllFileNamesInDirectory = (location: string): string[] => {
    const fileNamesList: string[] = fs.readdirSync(location);
    return fileNamesList;
}

/**
 * @param fullPath absolute path to file
 * @returns true if file under specfied path exists
 */
export const doesFileExist = (fullPath: string): boolean => {
    try {
        fs.accessSync(fullPath);
        return true;
    }
    catch {
        return false;
    }
}

/**
 * Reads file and parses it to JSON format
 * @param fullPath absolute path to file
 * @returns JSON
 */
export const readJson = (fullPath: string): object => {
    const rawData = fs.readFileSync(fullPath, 'utf-8');
    const json = JSON.parse(rawData);

    return json;
}

/**
 * Saves object as JSON in specified location
 * @param data data to be saved
 * @param fullPath absolute path with name of the file
 */
export const saveJson = (data: object, fullPath: string) => {
    const json = JSON.stringify(data);
    fs.writeFileSync(fullPath, json, 'utf8')
}