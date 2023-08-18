export type Character = {
    // Not for comparison
    Id: string;
    Name: string;

    // For comparison
    Rarity: number;
    Class: string;
    Attack_Range: string;
    Position: string;
    Gender: string;
    Race: string | string[];
    Faction: string;
}

export type CharacterHeader = {
    Id: string;
    Name: string;
}

export type CharacterHeaderMap = Map<string, CharacterHeader[]>

export type CharacterComparisonResult = {
    character: Character;
    isCorrect: boolean;
    differences: number[]
}

