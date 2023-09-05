import { Operator, OperatorHeader, OperatorHeaderMap, OperatorComparisonResult, OperatorRaceDescription } from "./types";
import path from 'path';
import { getAllFileNamesInDirectory, readJson, doesFileExist } from "@/lib/filesystem";
import { 
    EXTERNAL_PATH_TO_OPERATOR_ICONS,
    LOCAL_PATH_TO_OPERATOR_ICONS, 
    PATH_TO_OPERATOR_DATA,
    PATH_TO_OPERATOR_RACE, 
} from "@/lib/paths";

// Const
const imageFormat = '.webp';
const operatorDataFormat = '.json';
const localPathToOperators = path.join(process.cwd(), ...PATH_TO_OPERATOR_DATA);
const localPathToRaces = path.join(process.cwd(), ...PATH_TO_OPERATOR_RACE)
const pathToOperatorIcon = path.join(...EXTERNAL_PATH_TO_OPERATOR_ICONS)


// Functions
/**
 * @param id is unique string for each operator (ex. R001 is Amiya).
 * @returns Operator with that id
 */
export const getOperatorById = (id: string): Operator => {
    const fileExist = doesFileExist(path.join(localPathToOperators, id + operatorDataFormat))
    if (fileExist == false) {
        throw new Error(`File ${id + operatorDataFormat} not found`)
    }

    const operator = readJson(path.join(localPathToOperators, id + operatorDataFormat)) as Operator;
    return operator;
}

/**
 * @returns array of OperatorHeader for all operators.
 */
export const getAllOperatorHeaders = (): OperatorHeader[] => {
    const fileNames: string[] = getAllFileNamesInDirectory(localPathToOperators);

    const operatorHeaders: OperatorHeader[] = [];
    fileNames.forEach(file => {
        const operator = readJson(path.join(localPathToOperators, file)) as Operator;

        const ch: OperatorHeader = {
            Id: operator.Id,
            Name: operator.Name,
        }

        operatorHeaders.push(ch);
    })

    return operatorHeaders;
}

/**
 * @param id is unique string for each operator (ex. R001 is Amiya).
 * @returns route for operator icon art, you may need to add '/' for nextjs's Image component
 */
export const getRouteToOperatorIcon = (id: string): string => {
    const fileExist = doesFileExist(path.join(process.cwd(), pathToOperatorIcon, id + imageFormat))
    
    if (fileExist == false) {
        throw new Error(`Icon ${id + imageFormat} not found`)
    }

    const route = path.join(...LOCAL_PATH_TO_OPERATOR_ICONS, id + imageFormat);
    return route;
}

/**
 * @returns array of FileNames, they are in format `ID.json`
 */
export const getAllOperatorFileNames = (): string[] => {
    const fileNames: string[] = getAllFileNamesInDirectory(localPathToOperators);
    return fileNames;
}

export const handleOperatorGuess = (id: string): OperatorComparisonResult => {
    const todayId = getDayOperatorId(new Date());
    return compareTwoOperators(todayId, id);
}

/**
 * @returns Id of that day operator
 */
export const getDayOperatorId = (date: Date): string => {
    const seed: number = date.getMonth() * date.getDate() + date.getDate()

    // Operator data
    const operator: string[] = getAllOperatorFileNames();
    const amountOfOperators = operator.length;

    const indexOfOperatorArray = seed % amountOfOperators;
    // Operator array has filenames in ID.json format so we need ignore .json
    const id = operator[indexOfOperatorArray].split('.')[0];

    return id;
}

export const getOperatorHeaderMap = (): OperatorHeaderMap => {
    const headerMap: OperatorHeaderMap = new Map<string, OperatorHeader[]>();
    const operatorHeaders = getAllOperatorHeaders();

    operatorHeaders.forEach(header => {
        const firstLetterOfName = header.Name[0]
        const operatorHeaderArray = headerMap.get(firstLetterOfName)

        // If there is no array yet, then create it and populate with first header.
        if (typeof operatorHeaderArray === 'undefined') {
            headerMap.set(firstLetterOfName, [header])
        }
        else {
            operatorHeaderArray.push(header);
        }
    })

    return headerMap;
}

export const getOperatorHeader = (id: string): OperatorHeader => {
    return getOperatorById(id).getOperatorHeader();
}

export const compareTwoOperators = (originalId: string, comparedId: string): OperatorComparisonResult => {
    // Get operator data
    const oc: Operator = getOperatorById(originalId);
    const cc: Operator = getOperatorById(comparedId);

    // Compare
    const differencesArray: number[] = [];
    const data1 = new Map<string, unknown>(Object.entries(oc));
    const data2 = new Map<string, unknown>(Object.entries(cc));
    const keys = Array.from(data1.keys())

    keys.forEach((key) => {
        if (key != 'Id' && key !== 'Name') {
            differencesArray.push(__compareTwoOperatorsComparer(data1.get(key as string), data2.get(key as string)))
        }
    })

    const indexOfNotCorrectAnswer = differencesArray.findIndex((item) => {return item < 1});

    const outputObj: OperatorComparisonResult = {
        operator: cc,
        differences: differencesArray,
        isCorrect: indexOfNotCorrectAnswer === -1 ? true : false
    }

    return outputObj;
}

const __compareTwoOperatorsComparer = (t1: unknown, t2: unknown): number => {
    //  1 means correct
    //  0 means partial
    // -1 means wrong

    if (typeof t1 !== 'object' && typeof t2 !== 'object') {
        return t1 === t2 ? 1 : -1;
    }

    let te1;
    let te2;
    if (typeof t1 === 'object' && typeof t2 !== 'object' || typeof t1 !== 'object' && typeof t2 === 'object') {
        if (typeof t1 === 'object') {
            te1 = t1 as unknown[]
            te2 = [t2]
        }
        else {
            te1 = [t1]
            te2 = t2 as unknown[]
        }
    }
    else {
        te1 = t1 as unknown[];
        te2 = t2 as unknown[];
    }

    const t1s = [...te1!.sort()];
    const t2s = [...te2!.sort()];
    let sameCounter = 0;

    t1s.forEach((item1) => {
        t2s.forEach((item2) => {
            if (item1 === item2) sameCounter++;
        })
    })

    if (sameCounter === 0) return -1;
    if (te1.length === te2.length && sameCounter === te1.length) return 1;
    return 0;
}

// Health checks


// Helpers
export const getAllRaces = (): string[] => {
    const headers: OperatorHeader[] = getAllOperatorHeaders();
    let races: string[] = []
    headers.forEach((item) => 
        {
            const race: string | string[] = getOperatorById(item.Id).Race;
            if (typeof race === 'object') {
                races = [...races, ...race];
            }
            else {
                races = [...races, race];
            }
        }
    );
    
    const uniq = races.filter((value, index, array) => array.indexOf(value) === index);
    return uniq.sort();
}

// All info was taken from arknights fandom wiki
// href: https://arknights.fandom.com/wiki/Arknights_Wiki
export const getOperatorRaceDescription = (raceName: string): OperatorRaceDescription => {
    const fileExist = doesFileExist(path.join(localPathToRaces, raceName + operatorDataFormat))
    if (fileExist == false) {
        throw new Error(`File ${raceName + operatorDataFormat} not found`)
    }

    const raceDescription = readJson(path.join(localPathToRaces, raceName + operatorDataFormat)) as OperatorRaceDescription;
    return raceDescription;
}