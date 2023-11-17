import { doesFileExist } from "@/src/lib/filesystem";
import { Operator, OperatorHeader, OperatorHealthcheckResult } from "./types";
import { getAbsolutePathToIcon, getAllOperatorHeaders, getOperatorById, getRaceDescription } from "./utils";


// Helpers
/**
 * @returns array of all races in app
 */
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

// Healthchecks
/**
 * @returns object of type {@link OperatorHealthcheckResult} with results
 */
export const doHealthCheck = (): OperatorHealthcheckResult => {
    const output: OperatorHealthcheckResult = {
        errorsOperators: __doHealthCheck_Operator(),
        errorsOperatorIcon: __doHealthCheck_Icon(),
        errorsOperatorRace: __doHealthCheck_Race()
    }

    return output;
}

// HC - Operator
/**
 * @returns array of erros with operator data
 */
const __doHealthCheck_Operator = (): string[] => {
    const errors: string[] = [];

    const allOperatorHeaders: OperatorHeader[] = getAllOperatorHeaders();
    allOperatorHeaders.forEach((header) => {
        const operatorData: Operator = getOperatorById(header.Id);
        // Id: string
        // 1. Is empty
        if (_isEmptyOrNull(operatorData.Id)) {
            errors.push(`File ${header.Id} has empty Id`);
        }
        // 2. Id does not match
        else if (header.Id !== operatorData.Id) {
            errors.push(`File ${header.Id} has not matching Id`);
        }

        // Name: string
        // 1. Is empty
        if (_isEmptyOrNull(operatorData.Name)) {
            errors.push(`File ${header.Id} has empty Name`);
        }
        // 2. Has whitespaces
        else if (_hasWhitespaces(operatorData.Name)) {
            errors.push(`File ${header.Id} has whitespaces in Name`);
        }
        
        // Rarity: number
        // 1. Is empty
        if (_isNull(operatorData.Rarity)) {
            errors.push(`File ${header.Id} has empty Rarity`);
        }
        // 2. Is not withing 1->6 range
        else if (operatorData.Rarity < 1 || operatorData.Rarity > 6) {
            errors.push(`File ${header.Id} has invalid Rarity`);
        }

        // Class: string
        // 1. Is empty
        if (_isEmptyOrNull(operatorData.Class)) {
            errors.push(`File ${header.Id} has empty Class`);
        }   
        // 2. Has whitespaces
        else if (_hasWhitespaces(operatorData.Class)) {
            errors.push(`File ${header.Id} has whitespaces in Class`);
        }
        // 3. Invalid class name
        else if (_hasInvalidOperatorClass(operatorData.Class)){
            errors.push(`File ${header.Id} has invalid Class`);
        }

        // Branch: string
        // 1. Is empty
        if (_isEmptyOrNull(operatorData.Branch)) {
            errors.push(`File ${header.Id} has empty Branch`);
        }   
        // 2. Has whitespaces
        else if (_hasWhitespaces(operatorData.Branch)) {
            errors.push(`File ${header.Id} has whitespaces in Branch`);
        }

        // Attack_Range: string | string[]
        // 1. Is empty
        if (operatorData.Attack_Range === null || operatorData.Attack_Range.length === 0) {
            errors.push(`File ${header.Id} has empty Attack_Range`);
        }
        // 2. Invalid attack range
        else if (_hasInvalidAttackRange(operatorData.Attack_Range)) {
            errors.push(`File ${header.Id} has invalid Attack_Range`);
        }

        // Position: string | string[]
        // 1. Is empty
        if (operatorData.Position === null || operatorData.Position.length === 0) {
            errors.push(`File ${header.Id} has empty Position`);
        }
        // 2. Invalid position
        else if (_hasInvalidPosition(operatorData.Position)) {
            errors.push(`File ${header.Id} has invalid Position`);
        }    

        // Gender: string
        // 1. Is empty
        if (_isEmptyOrNull(operatorData.Gender)) {
            errors.push(`File ${header.Id} has empty Gender`);
        }
        // 2. Invalid gender
        else if (_hasInvalidGender(operatorData.Gender)) {
            errors.push(`File ${header.Id} has invalid Gender`);
        }

        // Race: string | string[]
        // 1. Is empty
        if (operatorData.Race === null || operatorData.Race.length === 0) {
            errors.push(`File ${header.Id} has empty Race`);
        }
        // 2. Has whitespaces
        else if (_hasWhitespaces(operatorData.Race)) {
            errors.push(`File ${header.Id} has whitespaces in Race`);
        }

        // Faction: string
        // 1. Is empty
        if (_isEmptyOrNull(operatorData.Faction)) {
            errors.push(`File ${header.Id} has empty Faction`);
        }
        // 2. Has whitespaces
        else if (_hasWhitespaces(operatorData.Race)) {
            errors.push(`File ${header.Id} has whitespaces in Faction`);
        }

    })

    return errors;
}

/**
 * Converts value to string array
 * @param value can be string or string[]
 * @returns array of string values
 */
const _toArray = (value: string | string[]): string[] => {
    let arr: string[] = [];
    if (typeof value === 'object') {
        arr = [...value];
    } 
    else {
        arr = [value];
    }

    return arr;
}

/**
 * @returns true if has whitespaces else it return false
 */
const _hasWhitespaces = (value: string | string[]): boolean => {
    const arr = _toArray(value);

    let isError: boolean = false;
    arr.forEach((ar) => {
        if (ar.trim().length < ar.length) {
            isError = true;
        }
    })

    return isError;
}

const _isEmptyOrNull = (value: string): boolean => value === null || value.length === 0

const _isNull = (value: unknown): boolean => value === null

/**
 * @param value operator class name
 * @returns true if class name is invalid
 */
const _hasInvalidOperatorClass = (value: string): boolean => {
    const validOperatorClasses = [
        "Caster",
        "Defender",
        "Guard",
        "Medic",
        "Sniper",
        "Specialist",
        "Supporter",
        "Vanguard",
    ]

    return validOperatorClasses.findIndex(oc => oc === value) === -1;
}

/**
 * @param value operator attack range
 * @returns true if attack range is invalid
 */
const _hasInvalidAttackRange = (value: string | string[]): boolean => {
    const validAttackRanges = [
        "Melee",
        "Ranged"
    ]

    const arr = _toArray(value);

    let isError: boolean = false;
    arr.forEach((ar) => {
        if (validAttackRanges.findIndex((r) => {return ar === r}) === -1) {
            isError = true;
        }
    })

    return isError;
}

/**
 * @param value operator position
 * @returns true if position is invalid
 */
const _hasInvalidPosition = (value: string | string[]): boolean =>{
    const validPositions = [
        "High ground",
        "Ground"
    ]

    const arr = _toArray(value);

    let isError: boolean = false;
    arr.forEach((ar) => {
        if (validPositions.findIndex((r) => {return ar === r}) === -1) {
            isError = true;
        }
    })

    return isError;
}

/**
 * @param value gender of operator
 * @returns True if gender is invalid
 */
const _hasInvalidGender = (value: string): boolean => {
    const validGenders = [
        "Male",
        "Female",
        "Conviction",
        'Unknown',
        'Undisclosed'
    ]

    return validGenders.findIndex((vg) => value === vg) === -1;
}

// HC - Icon
/**
 * @returns array of erros with icons
 */
const __doHealthCheck_Icon = (): string[] => {
    const errors: string[] = [];

    const allOperatorHeaders: OperatorHeader[] = getAllOperatorHeaders();
    allOperatorHeaders.forEach((header) => {
        const route = getAbsolutePathToIcon(header.Id);
        if (doesFileExist(route) === false) {
            errors.push(`Operator with Id ${header.Id} does not have icon`)
        }
    })

    return errors;
}
// HC - Race
/**
 * @returns array of erros with race
 */
const __doHealthCheck_Race = (): string[] => {
    const errors: string[] = [];

    const allOperatorHeaders: OperatorHeader[] = getAllOperatorHeaders();
    allOperatorHeaders.forEach((header) => {
        const operator = getOperatorById(header.Id);
        const races = _toArray(operator.Race);
        races.forEach((race) => {
            const raceFile = getRaceDescription(race);
            if (raceFile === null) {
                errors.push(`There is no race description for ${race}`);
            }
        })
    })

    return errors;
}