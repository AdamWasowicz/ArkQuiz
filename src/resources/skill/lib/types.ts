import { OperatorHeader } from "../../operator/lib/types"

export interface Skill {
    Number: number,
    Name: string
}

export interface SkillHeader{
    Id: string,
    Number: number,
}

export interface OperatorSkillsData {
    Id: string,
    Skills: Skill[]
} 

export interface SkillComparisonResult {
    Header: OperatorHeader,
    IsCorrect: boolean
}