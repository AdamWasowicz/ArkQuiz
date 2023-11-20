import fs from 'fs';

/** 
 * @param absolutePath absolute path to directory
 * @returns array of all files in specified location 
 * */
export const getAllFileNamesInDirectory = (absolutePath: string): string[] => {
    const fileNamesList: string[] = fs.readdirSync(absolutePath);
    return fileNamesList;
}

/**
 * @param absolutePath absolute path to file
 * @returns true if file under specfied path exists
 */
export const doesFileExist = (absolutePath: string): boolean => {
    try {
        fs.accessSync(absolutePath);
        return true;
    }
    catch {
        return false;
    }
}

/**
 * Reads file and parses it to JSON format
 * @param absolutePath absolute path to file
 * @returns JSON
 */
export const readJson = (absolutePath: string): object | undefined => {
    try {
        const rawData = fs.readFileSync(absolutePath, 'utf-8');
        const json = JSON.parse(rawData);
        return json;
    }
    catch (exception) {
        return undefined;
    }
}

/**
 * Saves object as JSON in specified location
 * @param data data to be saved
 * @param absolutePath absolute path with name of the file
 */
export const saveJson = (data: object, absolutePath: string) => {
    const json = JSON.stringify(data);
    fs.writeFileSync(absolutePath, json, 'utf8')
}