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

export interface OperatorSkills  {
    Id: string;
    Skills: Skill[];

    // constructor(Id: string, Skills: Skill[]) {
    //     this.Id = Id;
    //     this.Skills = Skills;
    // }
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
    ErrorsSkill: string[]
    ErrorsIcon: string[]
}

export class SkillHelperFunctions {
    public static toSkillHeader(input: OperatorSkills): SkillHeader[] {
        const output: SkillHeader[] = input.Skills.map((skill) => {
            return {
                Id: input.Id,
                Name: skill.Name,
                Number: skill.Number
            } satisfies SkillHeader
        })

        return output;
    } 
}

export type SkillHints = {
    Name: string
    OperatorBranch: string,
    OperatorFaction: string
}