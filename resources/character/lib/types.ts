export interface CharacterHeader {
    Id: string,
    Name: string
}

export interface CharacterData {
    Rarity: number,
    Class: string,
    Branch: string
    Attack_Range: string | string[],
    Position: string,
    Gender: string,
    Race: string | string[],
    Faction: string
}

export class Character implements CharacterHeader, CharacterData{
    Id: string = "";
    Name: string = "";

    Rarity: number = 0;
    Class: string = "";
    Branch: string = "Unknown";
    Attack_Range: string | string[] = [];
    Position: string = "";
    Gender: string = "";
    Race: string | string[] = [];
    Faction: string = "";

    public getCharacterHeader = (): CharacterHeader => {
        return {
            Id: this.Id,
            Name: this.Name
        }
    }

    public getCharacterData = (): CharacterData => {
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

export type CharacterHeaderMap = Map<string, CharacterHeader[]>

export type CharacterComparisonResult = {
    character: Character;
    isCorrect: boolean;
    differences: number[]
}

