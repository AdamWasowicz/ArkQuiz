import { OperatorHeader } from "../../operator/lib/types"

export interface Talent {
    Name: string,
    Description: string
}

export interface TalentHeader {
    OperatorId: string,
    Name: string,
    Description: string
}

export interface OperatorTalents {
    OperatorId: string,
    Talents: Talent[]
}

export interface TalentComparisonResult  {
    OperatorHeader: OperatorHeader,
    IsCorrect: boolean
}

export class TalentHelperFunctions {
    public static toTalentHeader(input: OperatorTalents): TalentHeader[] {
        const output = input.Talents.map((talent) => {
            return { 
                OperatorId: input.OperatorId,
                Name: talent.Name,
                Description: talent.Description
            } satisfies TalentHeader
        })

        return output;
    }
}