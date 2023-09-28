import { OperatorHeader } from "../../operator/lib/types"

export interface Skill {
    Number: number,
    Name: string
}

export interface SkillHeader{
    Id: string,
    Number: number,
    Name: string
}

export interface OperatorSkillsData {
    Id: string,
    Skills: Skill[]
} 

export interface SkillComparisonResult {
    OperatorHeader: OperatorHeader,
    IsCorrect: boolean
}

export type SkillHeaderComposite = {
    WhenCreated: Date,
    Version: string,
    Data: SkillHeader[]
}

export interface SkillHealthCheckResult {
    errorsSkill: string[]
    errorSkillIcon: string[]
}
