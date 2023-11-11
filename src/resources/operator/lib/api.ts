import { NextRequest, NextResponse } from "next/server";
import { compareTwoOperatorsV2, getOperatorRaceDescription } from "./utils";
import { getDayOperatorId } from "./utils";


/**
 * @param req is of type {@link NextRequest}
 * @returns NextResponse of type {@link OperatorComparisonResultV2}
 */
export const POST_Operator_Guess = async (req: NextRequest): Promise<NextResponse> => {
    const body = await req.json();
    const guess = body.id;
    const timestamp = body.timestamp;

    const todayId = getDayOperatorId(new Date(timestamp));
    const response = new NextResponse(JSON.stringify(compareTwoOperatorsV2(todayId, guess)), 
        {
            status: 200,
            headers: {
                'content-type': 'application/json',
            },
        }
    );
    return response;
}


/**
 * @returns NextResponse of type {@link String}
 */
export const GET_Operator_Race = async (_: Request, { params }: { params: { race: string } }): Promise<NextResponse> => {
    const race = params.race

    const data = getOperatorRaceDescription(race);
    const response = new NextResponse(JSON.stringify(data), 
        {
            status: 200,
            headers: {
                'content-type': 'application/json',
            },
        }
    );
    return response;
}