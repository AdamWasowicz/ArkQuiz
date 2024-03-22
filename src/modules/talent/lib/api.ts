import { NextRequest, NextResponse } from "next/server";
import { getTalentByDate } from "./utils";
import { getOperatorById } from "../../operator/lib/server-utils";
import { OperatorHelperFunctions } from "../../operator/lib/types";
import { TalentComparisonResult, TalentHeader, TalentHints } from "./types";


export const POST_Talent_Quiz = async (req: NextRequest): Promise<NextResponse> => {
    const body = await req.json();
    const id = body.id;
    const timestamp = body.timestamp;

    const todayTalent = getTalentByDate(new Date(timestamp));
    const operator = getOperatorById(id) ;
    if (operator === undefined) {
        return new NextResponse(null, {status: 400})
    }

    const header = OperatorHelperFunctions.toOperatorHeader(operator);

    const responseData: TalentComparisonResult = {
        OperatorHeader: header,
        IsCorrect: todayTalent.OperatorId === id
    }

    const response = new NextResponse(
        JSON.stringify(responseData),
        {
            status: 200,
            headers: {'content-type': 'application/json',},
        }
    )

    return response;
}

export const GET_Talent_Quiz = async (): Promise<NextResponse> => {
    const todayTalent = getTalentByDate(new Date());

    const response = new NextResponse(
        JSON.stringify(todayTalent),
        {
            status: 200,
            headers: { 'content-type': 'application/json', },
        }
    )

    return response;
}

export const GET_Talent_Hints = async (req: NextRequest): Promise<NextResponse> => {
    const timestamp = new Date(req.nextUrl.searchParams.get("timestamp")!)

    const talent: TalentHeader = getTalentByDate(timestamp);
    const operator = getOperatorById(talent.OperatorId);

    const output = {
        Name: talent.Name,
        OperatorFaction: operator?.Faction ?? '',
        OperatorBranch: `${operator?.Branch} ${operator?.Class}` ?? ''
    } satisfies TalentHints


    const response = new NextResponse(JSON.stringify(output), 
        {
            status: 200,
            headers: {
                'content-type': 'application/json',
            },
        }
    );

    return response;
}