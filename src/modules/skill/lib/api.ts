import { NextRequest, NextResponse } from "next/server";
import { getSkillByDate } from "./utils";
import { SkillComparisonResult } from "./types";
import { OperatorHelperFunctions } from "../../operator/lib/types";
import { getOperatorById } from "../../operator/lib/utils";


/** POST: send skill guess, body of request contains id of operator and timestamp of when guess was posted */
export const POST_Skill_Guess = async (req: NextRequest): Promise<NextResponse> => {
    const body = await req.json();
    const guess = body.id;
    const timestamp = body.timestamp;

    const daySkill = getSkillByDate(new Date(timestamp));
    const operator = getOperatorById(guess);
    if (operator === undefined) {
        return new NextResponse(null, {status: 400})
    }

    const header = OperatorHelperFunctions.toOperatorHeader(operator);

    const responseData: SkillComparisonResult = {
        OperatorHeader: header,
        IsCorrect: daySkill.Id === guess
    }
    const response = new NextResponse(JSON.stringify(responseData), 
        {
            status: 200,
            headers: {'content-type': 'application/json',},
        }
    );
    return response;
}

/** GET: get today skill data */
export const GET_Skill_Guess = async (): Promise<NextResponse> => {
    const daySkill = getSkillByDate(new Date());

    const response = new NextResponse(
        JSON.stringify(daySkill), 
        {
            status: 200,
            headers: { 'content-type': 'application/json', },
        }
    );

    return response;
}
