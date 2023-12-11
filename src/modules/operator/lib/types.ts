/** Represents only Operator data used for identification */
export interface OperatorHeader {
    Id: string,
    Name: string
}

/** Operator data */
export interface OperatorData {
    Rarity: number,
    Class: string,
    Branch: string
    Attack_Range: string | string[],
    Position: string | string[],
    Gender: string,
    Race: string | string[],
    Faction: string
}

/** Full Operator data */
export interface Operator extends OperatorHeader, OperatorData {}

/** Contains key-value pairs of Operator name and its header */
export type OperatorHeaderMap = Map<string, OperatorHeader[]>

/** Represents single guess result */
export type OperatorComparisonResultV2 = {
    operator: Operator;
    isCorrect: boolean
    diffrences: OperatorComparisonDiffrenceV2
}

/** Represents diffrences in Operator comparison */
export type OperatorComparisonDiffrenceV2 = {
    //  1 means correct
    //  0 means partial
    // -1 means wrong
    Rarity: number,
    Class: number,
    Branch: number,
    Attack_Range: number,
    Position: number,
    Gender: number
    Race: number
    Faction: number
}

/** Object for Operator race description  */
export type RaceDescription = {
    Race: string,
    Description: string
}

/** Object agregating healthchecks errors */
export type OperatorHealthcheckResult = {
    ErrorsOperators: string[],
    ErrorsRace: string[],
    ErrorsIcon: string[],
}

/** Header of composite file */
export type OperatorHeaderComposite = {
    WhenCreated: Date,
    Version: string,
    Data: OperatorHeader[]
}

export class OperatorHelperFunctions {
    public static toOperatorHeader(input: Operator): OperatorHeader {
        return { Id: input.Id, Name: input.Name } satisfies OperatorHeader
    }

    public static toOperatorData(input: Operator): OperatorData {
        return {
            Rarity: input.Rarity,
            Class: input.Class,
            Branch: input.Branch,
            Attack_Range: input.Attack_Range,
            Position: input.Position,
            Gender: input.Gender,
            Race: input.Race,
            Faction: input.Faction
        } satisfies OperatorData
    }
}

export type OperatorHints = {
    trait: string,
    talent: string,
    skill: string
}