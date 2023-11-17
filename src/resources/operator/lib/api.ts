import { NextRequest, NextResponse } from "next/server";
import { compareTwoOperatorsV2, getOperatorById, getRaceDescription } from "./utils";
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

    if (getOperatorById(guess) == undefined) {
        return new NextResponse(null, { status: 400 });
    }


    try {
        const comparisonResult = compareTwoOperatorsV2(todayId, guess);
        const response = new NextResponse(JSON.stringify(comparisonResult), 
            {
                status: 200,
                headers: {
                    'content-type': 'application/json',
                },
            }
        );
        return response;
    }
    catch (exception) {
        return new NextResponse(null, { status: 500 });
    }
}


/**
 * @returns NextResponse of type {@link String}
 */
export const GET_Operator_Race = async (_: Request, { params }: { params: { race: string } }): Promise<NextResponse> => {
    const race = params.race

    const raceData = getRaceDescription(race);
    if (raceData == undefined) {
        return new NextResponse(null, {status: 400})
    }

    const response = new NextResponse(JSON.stringify(raceData), 
        {
            status: 200,
            headers: {
                'content-type': 'application/json',
            },
        }
    );
    return response;
}