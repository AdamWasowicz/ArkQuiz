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
export class Operator implements OperatorHeader, OperatorData{
    Id: string = "";
    Name: string = "";

    Rarity: number = 0;
    Class: string = "";
    Branch: string = "Unknown";
    Attack_Range: string | string[] = [];
    Position: string | string[] = [];
    Gender: string = "";
    Race: string | string[] = [];
    Faction: string = "";

    static getOperatorHeader = (operator: Operator): OperatorHeader => {
        return {
            Id: operator.Id,
            Name: operator.Name
        }
    }

    public getOperatorData = (): OperatorData => {
        return {
            Rarity: this.Rarity,
            Class: this.Class,
            Branch: this.Branch,
            Attack_Range: this.Attack_Range,
            Position: this.Position,
            Gender: this.Gender,
            Race: this.Race,
            Faction: this.Faction
        }
    }
}

/** Contains key-value pairs of Operator name and its header */
export type OperatorHeaderMap = Map<string, OperatorHeader[]>

/** (DEPRACTED) Represents single guess result */
export type OperatorComparisonResult = {
    operator: Operator;
    isCorrect: boolean;
    differences: number[]
}

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
    Name: string,
    Description: string
}

/** Object agregating healthchecks errors */
export type OperatorHealthcheckResult = {
    errorsOperators: string[],
    errorsOperatorRace: string[],
    errorsOperatorIcon: string[],
}

/** Header of composite file */
export type OperatorHeaderComposite = {
    WhenCreated: Date,
    Version: string,
    Data: OperatorHeader[]
}