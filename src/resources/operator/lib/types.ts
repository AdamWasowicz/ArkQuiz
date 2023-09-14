export interface OperatorHeader {
    Id: string,
    Name: string
}

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

export type OperatorHeaderMap = Map<string, OperatorHeader[]>

export type OperatorComparisonResult = {
    operator: Operator;
    isCorrect: boolean;
    differences: number[]
}

export type OperatorRaceDescription = {
    Race: string,
    Description: string
}

export type OperatorHealthcheckResult = {
    errorsOperators: string[],
    errorsOperatorRace: string[],
    errorsOperatorIcon: string[],
}