import { NextRequest, NextResponse } from "next/server";
import { getDaySkill } from "./utils";
import { SkillComparisonResult } from "./types";
import { getOperatorById } from "../../operator/lib/utils";
import { Operator } from "../../operator/lib/types";

export const POST_Skill_Guess = async (req: NextRequest): Promise<NextResponse> => {
    const body = await req.json();
    const guess = body.id;
    const timestamp = body.timestamp;

    const daySkill = getDaySkill(new Date(timestamp));
    const operator = getOperatorById(guess);
    const header = Operator.getOperatorHeader(operator);

    const responseData: SkillComparisonResult = {
        OperatorHeader: header,
        IsCorrect: daySkill.Id === guess
    }
    const response = new NextResponse(JSON.stringify(responseData), 
        {
            status: 200,
            headers: {
                'content-type': 'application/json',
            },
        }
    );
    return response;
}

export const GET_Skill_Guess = async (): Promise<NextResponse> => {
    const daySkill = getDaySkill(new Date());

    const response = new NextResponse(JSON.stringify(daySkill), 
        {
            status: 200,
            headers: {
                'content-type': 'application/json',
            },
        }
    );
    return response;
}
