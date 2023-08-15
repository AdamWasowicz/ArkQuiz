import fs from 'fs';

export const getAllFileNamesInDirectory = (location: string): string[] => {
    const fileNamesList: string[] = fs.readdirSync(location);
    return fileNamesList;
}

export const doesFileExist = (fullPath: string): boolean => {
    try {
        fs.accessSync(fullPath);
        return true;
    }
    catch {
        return false;
    }
}

export const readJson = (fullPath: string): unknown => {
    const rawData = fs.readFileSync(fullPath, 'utf-8');
    const json = JSON.parse(rawData);

    return json;
}