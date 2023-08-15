export type Character = {
    Id: string;
    Name: string;
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